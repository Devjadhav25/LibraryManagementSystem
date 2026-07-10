package com.dev.library_management_system.services.impl;

import com.dev.library_management_system.domain.PaymentGateway;
import com.dev.library_management_system.domain.PaymentStatus;
import com.dev.library_management_system.event.publisher.PaymentEventPublisher;
import com.dev.library_management_system.exception.PaymentException;
import com.dev.library_management_system.mapper.PaymentMapper;
import com.dev.library_management_system.model.Payment;
import com.dev.library_management_system.model.Subscription;
import com.dev.library_management_system.model.User;
import com.dev.library_management_system.payload.dto.PaymentDto;
import com.dev.library_management_system.payload.request.PaymentInitiateRequest;
import com.dev.library_management_system.payload.request.PaymentVerifyRequest;
import com.dev.library_management_system.payload.response.PaymentInitiateResponse;
import com.dev.library_management_system.payload.response.PaymentLinkResponse;
import com.dev.library_management_system.repository.PaymentRepository;
import com.dev.library_management_system.repository.SubscriptionRepository;
import com.dev.library_management_system.repository.UserRepository;
import com.dev.library_management_system.services.PaymentService;
import com.dev.library_management_system.services.gateway.RazorpayService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class PaymentServiceImpl implements PaymentService {

    private final PaymentRepository paymentRepository;
    private final UserRepository userRepository;
    private final SubscriptionRepository subscriptionRepository;
    private final RazorpayService razorpayService;
    private final PaymentMapper paymentMapper;
    private final PaymentEventPublisher paymentEventPublisher;

    @Override
    public PaymentInitiateResponse initiatePayment(PaymentInitiateRequest request) {

        User user = userRepository.findById(request.getUserId())
                .orElseThrow(() -> new PaymentException("User not found with ID: " + request.getUserId()));

        // 2. Create the initial Payment record
        Payment payment = new Payment();
        payment.setUser(user);
        payment.setPaymentType(request.getPaymentType());
        payment.setGateway(request.getGateway());
        payment.setAmount(request.getAmount());
        payment.setDescription(request.getDescription());
        payment.setStatus(PaymentStatus.PENDING);
        payment.setTransactionId(UUID.randomUUID().toString());
        payment.setInitiatedAt(LocalDateTime.now());

        // 3. Link Subscription (if applicable)
        if (request.getSubscriptionId() != null) {
            Subscription subscription = subscriptionRepository.findById(request.getSubscriptionId())
                    .orElseThrow(() -> new PaymentException("Subscription not found"));
            payment.setSubscription(subscription);
        }

        // Save the pending payment to generate its Database ID
        Payment savedPayment = paymentRepository.save(payment);

        PaymentLinkResponse paymentLinkResponse = null;

        // 4. Create Gateway Link
        if (request.getGateway() == PaymentGateway.RAZORPAY) {
            paymentLinkResponse = razorpayService.createPaymentLink(user, savedPayment);
        }

        if (paymentLinkResponse == null) {
            throw new PaymentException("Failed to generate payment link from gateway");
        }

        // 5. Update Payment with Gateway Order ID & status
        savedPayment.setGatewayOrderId(paymentLinkResponse.getPayment_link_id());
        savedPayment.setStatus(PaymentStatus.PROCESSING);
        paymentRepository.save(savedPayment);

        // 6. Build and return the response payload for the frontend
        return PaymentInitiateResponse.builder()
                .paymentId(savedPayment.getId())
                .checkoutUrl(paymentLinkResponse.getPayment_link_url())
                .transactionId(savedPayment.getTransactionId())
                .amount(savedPayment.getAmount())
                .description(savedPayment.getDescription())
                .success(true)
                .message("Payment initiated successfully")
                .build();
    }

    @Override
    public PaymentDto verifyPayment(PaymentVerifyRequest request) throws Exception {
        // 1. Check validity via Razorpay API
        boolean isValid = razorpayService.isPaymentValid(request.getRazorpayPaymentId());

        // 2. BYPASS RAZORPAY NOTES ENTIRELY!
        // Look up the payment in our database using the plink_ ID we saved earlier
        Payment payment = paymentRepository.findByGatewayOrderId(request.getRazorpayPaymentId())
                .orElseThrow(() -> new PaymentException("Payment record not found for Order ID: " + request.getRazorpayOrderId()));

        // 3. Update internal record with the Gateway's official Payment ID
        payment.setGatewayPaymentId(request.getRazorpayPaymentId());

        // 4. Process the result
        if (isValid) {
            payment.setStatus(PaymentStatus.SUCCESS);
            payment.setCompletedAt(LocalDateTime.now());
            paymentRepository.save(payment);

            // 5. Publish the success event so listeners (like Subscription) can activate
            paymentEventPublisher.publishPaymentSuccessEvent(payment);
        } else {
            payment.setStatus(PaymentStatus.FAILED);
            paymentRepository.save(payment);
            throw new PaymentException("Payment verification failed at gateway");
        }

        return paymentMapper.toDto(payment);
    }

    @Override
    public Page<PaymentDto> getAllPayments(Pageable pageable) {
        Page<Payment> payments = paymentRepository.findAll(pageable);
        return payments.map(paymentMapper::toDto);
    }
}