package com.dev.library_management_system.services.impl;

import com.dev.library_management_system.domain.PaymentGateway;
import com.dev.library_management_system.domain.PaymentType;
import com.dev.library_management_system.exception.SubscriptionException;
import com.dev.library_management_system.mapper.SubscriptionMapper;
import com.dev.library_management_system.model.Subscription;
import com.dev.library_management_system.model.SubscriptionPlan;
import com.dev.library_management_system.model.User;
import com.dev.library_management_system.payload.dto.SubscriptionDto;
import com.dev.library_management_system.payload.request.PaymentInitiateRequest;
import com.dev.library_management_system.payload.response.PaymentInitiateResponse;
import com.dev.library_management_system.repository.SubscriptionPlanRepository;
import com.dev.library_management_system.repository.SubscriptionRepository;
import com.dev.library_management_system.services.PaymentService;
import com.dev.library_management_system.services.SubscriptionService;
import com.dev.library_management_system.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class SubscriptionImpl implements SubscriptionService {

    private final SubscriptionRepository subscriptionRepository;
    private final SubscriptionPlanRepository subscriptionPlanRepository;
    private final UserService userService;
    private final SubscriptionMapper subscriptionMapper;
    private final PaymentService paymentService;

    @Override
    public PaymentInitiateResponse subscribe(SubscriptionDto dto) throws SubscriptionException {
        User user = userService.getCurrentUser();

        // 2. Fetch the plan they want to subscribe to
        SubscriptionPlan plan = subscriptionPlanRepository.findById(dto.getPlanId())
                .orElseThrow(() -> new SubscriptionException("Subscription plan not found"));

        // 3. Create the subscription (initially inactive pending payment)
        Subscription subscription = subscriptionMapper.toEntity(dto, plan, user);

        // Ensure core date calculations and limits are set before saving
        subscription.initializeFromPlan();
        subscription.setIsActive(false); // Will be set to true ONLY after payment success

        Subscription savedSubscription = subscriptionRepository.save(subscription);

        // 4. Initiate Payment Request for Razorpay (Commented out until you implement PaymentService)
        PaymentInitiateRequest request = PaymentInitiateRequest.builder()
                .userId(user.getId())
                .subscriptionId(savedSubscription.getId())
                .paymentType(PaymentType.MEMBERSHIP)
                .gateway(PaymentGateway.RAZORPAY)
                .amount(savedSubscription.getPrice())
                .description("Library Membership Subscription: " + plan.getName())
                .build();

        return paymentService.initiatePayment(request);

    }

    @Override
    public SubscriptionDto getUserActiveSubscription(Long userId) throws SubscriptionException {
        User user = userService.getCurrentUser();

        // Pass LocalDateTime directly to match the Entity and Repository types
        Subscription subscription = subscriptionRepository.findActiveSubscriptionByUserId(user.getId(), LocalDateTime.now())
                .orElseThrow(() -> new SubscriptionException("No active subscription found"));

        return subscriptionMapper.toDto(subscription);
    }

    @Override
    public SubscriptionDto cancelSubscription(Long SubscriptionId, String reason) throws SubscriptionException {
        Subscription subscription = subscriptionRepository.findById(SubscriptionId)
                .orElseThrow(() -> new SubscriptionException("Subscription not found"));

        // Ensure only active/pending subscriptions are cancelled
        if (!subscription.getIsActive()) {
            throw new SubscriptionException("Subscription is already inactive");
        }

        subscription.setIsActive(false);
        subscription.setCancelledAt(LocalDateTime.now());
        subscription.setCancellationReason(reason != null ? reason : "Cancelled by user");

        Subscription updatedSubscription = subscriptionRepository.save(subscription);
        return subscriptionMapper.toDto(updatedSubscription);
    }

    @Override
    public SubscriptionDto activateSubscription(Long SubscriptionId, Long paymentId) throws SubscriptionException {
        Subscription subscription = subscriptionRepository.findById(SubscriptionId)
                .orElseThrow(() -> new SubscriptionException("Subscription not found by ID"));

        // Payment verification is assumed to be handled before calling this
        subscription.setIsActive(true);
        subscription.setStartDate(LocalDate.now().atStartOfDay());
        subscription.calculateEndDate();

        Subscription activatedSubscription = subscriptionRepository.save(subscription);
        return subscriptionMapper.toDto(activatedSubscription);
    }

    @Override
    public List<SubscriptionDto> getAllSubscriptions(Pageable pageable) {
        // Admin method to fetch all subscriptions
        List<Subscription> subscriptions = subscriptionRepository.findAll();
        return subscriptionMapper.toDtoList(subscriptions);
    }

    @Override
    public void deactivateExpiredSubscriptions() throws SubscriptionException {
        List<Subscription> expiredSubscriptions = subscriptionRepository.findExpiredActiveSubscriptions(LocalDateTime.now());

        for (Subscription subscription : expiredSubscriptions) {
            subscription.setIsActive(false);
            subscriptionRepository.save(subscription);
        }
    }
}