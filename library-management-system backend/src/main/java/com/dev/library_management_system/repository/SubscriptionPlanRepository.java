package com.dev.library_management_system.repository;

import com.dev.library_management_system.model.SubscriptionPlan;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SubscriptionPlanRepository extends JpaRepository<SubscriptionPlan, Long> {

    Boolean existsByPlanCode(String  planCode);

    SubscriptionPlan findByPlanCode(String planCode);

}
