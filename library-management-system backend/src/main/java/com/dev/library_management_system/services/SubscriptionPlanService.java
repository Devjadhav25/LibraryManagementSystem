package com.dev.library_management_system.services;

import com.dev.library_management_system.model.SubscriptionPlan;
import com.dev.library_management_system.payload.dto.SubscriptionPlanDto;

import java.util.List;

public interface SubscriptionPlanService {

    SubscriptionPlanDto createSubscriptionPlan(SubscriptionPlanDto planDto) throws Exception;

    SubscriptionPlanDto updateSubscriptionPlan(Long planId, SubscriptionPlanDto planDto) throws Exception;

    void deleteSubscriptionPlan(Long planId) throws Exception;

    List<SubscriptionPlanDto> getAllSubscriptionPlan();

    SubscriptionPlan getBySubscriptionPlanCode(String subscriptionPlanCode) throws Exception;


}
