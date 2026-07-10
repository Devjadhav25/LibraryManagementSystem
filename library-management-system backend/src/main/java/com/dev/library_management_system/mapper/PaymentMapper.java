package com.dev.library_management_system.mapper;

import com.dev.library_management_system.model.Payment;
import com.dev.library_management_system.payload.dto.PaymentDto;
import org.springframework.stereotype.Component;

@Component
public class PaymentMapper {
    public PaymentDto toDto(Payment payment) {
        if (payment == null) {
            return null;
        }

        PaymentDto dto = new PaymentDto();
        dto.setId(payment.getId());

        // Flatten User details
        if (payment.getUser() != null) {
            dto.setUserId(payment.getUser().getId());
            dto.setUserName(payment.getUser().getFullName());
            dto.setUserEmail(payment.getUser().getEmail());
        }

        // Link Module IDs (Only one of these will typically be populated per payment)
        if (payment.getSubscription() != null) {
            dto.setSubscriptionId(payment.getSubscription().getId());
        }
//        if (payment.getBookLoan() != null) {
//            dto.setBookLoanId(payment.getBookLoan().getId());
//        }
//        if (payment.getFine() != null) {
//            dto.setFineId(payment.getFine().getId());
//        }

        // Core Payment Fields
        dto.setPaymentType(payment.getPaymentType());
        dto.setStatus(payment.getStatus());
        dto.setGateway(payment.getGateway());
        dto.setAmount(payment.getAmount());

        // Gateway Tracking IDs
        dto.setTransactionId(payment.getTransactionId());
        dto.setGatewayPaymentId(payment.getGatewayPaymentId());
        dto.setGatewayOrderId(payment.getGatewayOrderId());
        dto.setGatewaySignature(payment.getGatewaySignature());

        // Timestamps
        dto.setInitiatedAt(payment.getInitiatedAt());
        dto.setCompletedAt(payment.getCompletedAt());
        dto.setCreatedAt(payment.getCreatedAt());
        dto.setUpdatedAt(payment.getUpdatedAt());

        return dto;
    }
}
