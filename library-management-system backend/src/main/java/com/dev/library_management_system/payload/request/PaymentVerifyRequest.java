package com.dev.library_management_system.payload.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PaymentVerifyRequest {

    private String razorpayPaymentId;
    private String razorpayOrderId;

    private String stripePaymentIntentId;
    private String StripePaymentIntentStatus;

}
