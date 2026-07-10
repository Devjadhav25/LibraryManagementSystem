package com.dev.library_management_system.services;

import com.dev.library_management_system.exception.SubscriptionException;
import com.dev.library_management_system.payload.dto.SubscriptionDto;
import com.dev.library_management_system.payload.response.PaymentInitiateResponse;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface SubscriptionService {

    PaymentInitiateResponse subscribe(SubscriptionDto dto) throws SubscriptionException;

    SubscriptionDto getUserActiveSubscription(Long userId) throws SubscriptionException;
    SubscriptionDto cancelSubscription(Long SubscriptionId, String reason) throws SubscriptionException;

    SubscriptionDto activateSubscription(Long SubscriptionId,  Long paymentId) throws SubscriptionException;

    List<SubscriptionDto> getAllSubscriptions(Pageable pageable);

    void deactivateExpiredSubscriptions() throws SubscriptionException;
}
