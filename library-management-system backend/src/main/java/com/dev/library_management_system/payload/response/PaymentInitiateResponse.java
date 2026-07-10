package com.dev.library_management_system.payload.response;

import com.dev.library_management_system.domain.PaymentGateway;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class PaymentInitiateResponse {


    private Long paymentId;
    private PaymentGateway gateway;

    private String transactionId;

    private String razorpayOrderId;

    private Long amount;



    private String description;

    // Frontend should redirect user to this URL for payment
    private String checkoutUrl;

    private String message;
    private Boolean success;
}
