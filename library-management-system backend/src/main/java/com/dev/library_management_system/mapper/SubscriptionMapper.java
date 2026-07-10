package com.dev.library_management_system.mapper;

import com.dev.library_management_system.exception.SubscriptionException;
import com.dev.library_management_system.model.Subscription;
import com.dev.library_management_system.model.SubscriptionPlan;
import com.dev.library_management_system.model.User;
import com.dev.library_management_system.payload.dto.SubscriptionDto;
import com.dev.library_management_system.repository.SubscriptionPlanRepository;
import com.dev.library_management_system.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
public class SubscriptionMapper {
    private final UserRepository userRepository;
    private final SubscriptionPlanRepository planRepository;

    // Convert Entity to DTO
    public SubscriptionDto toDto(Subscription subscription) {
        if (subscription == null) {
            return null;
        }

        SubscriptionDto dto = new SubscriptionDto();
        dto.setId(subscription.getId());

        // Flatten User details
        if (subscription.getUser() != null) {
            dto.setUserId(subscription.getUser().getId());
            dto.setUsername(subscription.getUser().getFullName());
            dto.setUserEmail(subscription.getUser().getEmail());
        }

        // Flatten Plan details
        if (subscription.getPlan() != null) {
            dto.setPlanId(subscription.getPlan().getId());

        }

        dto.setPlanName(subscription.getPlanName());
        dto.setPlanCode(subscription.getPlanCode());
        dto.setPrice(subscription.getPrice());
        if (subscription.getStartDate() != null) {
            dto.setStartDate(LocalDate.from(subscription.getStartDate()));
        }
        if (subscription.getEndDate() != null) {
            dto.setEndDate(LocalDate.from(subscription.getEndDate()));
        }
        dto.setIsActive(subscription.getIsActive());
        dto.setMaxBooksAllowed(subscription.getMaxBooksAllowed());
        dto.setMaxDaysPerBook(subscription.getMaxDaysPerBook());
        dto.setAutoRenew(subscription.getAutoRenew());

        dto.setCancelledAt(subscription.getCancelledAt());
        dto.setCancellationReason(subscription.getCancellationReason());
        dto.setNote(subscription.getNotes());

        // Dynamic helper fields calculating right before sending to frontend
        dto.setDaysRemaining(subscription.getDaysRemaining());
        dto.setIsValid(subscription.isValid());
        dto.setIsExpired(subscription.isExpired());

        dto.setCreatedAt(subscription.getCreatedAt());
        dto.setUpdatedAt(subscription.getUpdatedAt());

        return dto;
    }

    // Convert DTO to Entity
    public Subscription toEntity(SubscriptionDto dto, SubscriptionPlan plan , User user) throws SubscriptionException {
        if (dto == null) {
            return null;
        }

        Subscription subscription = new Subscription();
        subscription.setId(dto.getId());
        subscription.setPlan(plan);
        subscription.setUser(user);
        subscription.setNotes(dto.getNote());

        return subscription;
    }

    // Convert List of Entities to List of DTOs
    public List<SubscriptionDto> toDtoList(List<Subscription> subscriptions) {
        if (subscriptions == null) {
            return null;
        }
        return subscriptions.stream()
                .map(this::toDto)
                .collect(Collectors.toList());
    }
}
