package com.dev.library_management_system.payload.dto;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SubscriptionDto {

    private Long id;

    @NotNull(message = "User Id is Mandatory")
    private Long userId;

    private String username;
    private String userEmail;

    // Flattened Plan Details
    @NotNull(message = "planId is mandatory")
    private Long planId;
    private String planName;
    private String planCode;
    private Long price;
    private String currency;
    private Double priceInMajorUnits;


    // Core Subscription Terms
    private LocalDate startDate;
    private LocalDate endDate;
    private Boolean isActive;
    private Integer maxBooksAllowed;
    private Integer maxDaysPerBook;
    private Boolean autoRenew;

    // Cancellation & Notes
    private LocalDateTime cancelledAt;
    private String cancellationReason;
    private String note;

    // Dynamic Helper Fields (Calculated in the Mapper for the Frontend)
    private Long daysRemaining;
    private Boolean isValid;
    private Boolean isExpired;

    // Timestamps
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}