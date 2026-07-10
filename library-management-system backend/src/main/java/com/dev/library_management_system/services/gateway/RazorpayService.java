package com.dev.library_management_system.services.gateway;

import com.dev.library_management_system.domain.PaymentType;
import com.dev.library_management_system.model.Payment;
import com.dev.library_management_system.model.SubscriptionPlan;
import com.dev.library_management_system.model.User;
import com.dev.library_management_system.payload.response.PaymentLinkResponse;
import com.dev.library_management_system.services.SubscriptionPlanService;
import com.razorpay.PaymentLink;
import com.razorpay.RazorpayClient;
import com.razorpay.RazorpayException;
import lombok.RequiredArgsConstructor;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import static com.dev.library_management_system.domain.PaymentType.MEMBERSHIP;

@Service
@RequiredArgsConstructor
public class RazorpayService {

    private final SubscriptionPlanService subscriptionPlanService;

    @Value("${razorpay.key.id:}")
    private String razorpayKeyId;

    @Value("${razorpay.key.secret:}")
    private String razorpayKeySecret;

    @Value("${razorpay.callback.base-url:http://localhost:5173}")
    private String callbackBaseUrl;

    public PaymentLinkResponse createPaymentLink(User user, Payment payment){


        try{
            RazorpayClient razorpayClient = new RazorpayClient(razorpayKeyId, razorpayKeySecret);

            Long amountInPaisa= payment.getAmount()*(new java.math.BigDecimal("100").intValue());

            JSONObject paymentLinkRequest =new  JSONObject();
            paymentLinkRequest.put("amount", amountInPaisa);
            paymentLinkRequest.put("currency", "INR");
            paymentLinkRequest.put("description", payment.getDescription());

            JSONObject customer = new  JSONObject();
            customer.put("name", user.getFullName());
            customer.put("email", user.getEmail());
            if (user.getPhone() != null) {
                customer.put("contact", user.getPhone());
            }

            paymentLinkRequest.put("customer", customer);

            JSONObject notify = new JSONObject();
            notify.put("email", true);
            notify.put("sms", user.getPhone() != null);
            paymentLinkRequest.put("notify", notify);


            // Enable reminders
            paymentLinkRequest.put("reminder_enable", true);

            // Callback configuration
            String successUrl = callbackBaseUrl + "/payment-success/"+ payment.getId();

            paymentLinkRequest.put("callback_url", successUrl);
            paymentLinkRequest.put("callback_method", "get");

            JSONObject notes = new JSONObject();
            notes.put("user_id",user.getId().toString());
            notes.put("payment_id", payment.getId().toString());
            notes.put("payment_type", payment.getPaymentType().toString());

            if(payment.getPaymentType() == PaymentType.MEMBERSHIP){
                notes.put("subscription_id", payment.getSubscription().getId().toString());
                notes.put("plan", payment.getSubscription().getPlan().getPlanCode());
                notes.put("type", MEMBERSHIP);
            }else if(payment.getPaymentType() == PaymentType.FINE) {
                //notes.put("fine_id", payment.getFine().getId());
                notes.put("type", PaymentType.FINE);
            }

            paymentLinkRequest.put("notes",notes);

            PaymentLink paymentLink= razorpayClient.paymentLink.create(paymentLinkRequest);

            String paymentUrl=paymentLink.get("short_url");
            String paymentLinkId = paymentLink.get("id");

            PaymentLinkResponse response = new PaymentLinkResponse();
            response.setPayment_link_id(paymentLinkId);
            response.setPayment_link_url(paymentUrl);

            return response;

        }catch(RazorpayException e){
            throw new RuntimeException(e);
        }

    }

    public JSONObject fetchPaymentDetails(String paymentId) throws Exception {
        RazorpayClient razorpayClient = new RazorpayClient(razorpayKeyId, razorpayKeySecret);
        com.razorpay.Payment payment = razorpayClient.payments.fetch(paymentId);
        return payment.toJson();
    }

    public boolean isPaymentValid(String paymentId) throws Exception {
        // Fetch the official status from Razorpay's servers
        JSONObject paymentDetails = fetchPaymentDetails(paymentId);
        String status = paymentDetails.getString("status");

        long amount = paymentDetails.getLong("amount");
        long amountInRupees = amount/100;


        JSONObject notes = paymentDetails.getJSONObject("notes");

        String paymentType = notes.optString("type");


        // "captured" is Razorpay's official status for a fully successful payment
        if (!"captured".equals(status)) {

            return false;
        }



        //check expected amount
        if(paymentType.equals(PaymentType.MEMBERSHIP.toString())){
            String planCode = notes.optString(  "plan");
            SubscriptionPlan subscriptionPlan = subscriptionPlanService
                    .getBySubscriptionPlanCode(planCode);
            return amountInRupees == subscriptionPlan.getPrice();
        }else if(paymentType.equals(PaymentType.FINE.toString())){
            Long fineId = notes.getLong( "fine_id");



        }

        /* * Note from the video: The instructor mentions adding extra validation here
         * (like cross-checking the exact amount paid against the database amount)
         * to prevent users from tampering with the payload, but "captured" handles
         * the base status requirement safely for this build stage.
         */

        return true;
    }


}
