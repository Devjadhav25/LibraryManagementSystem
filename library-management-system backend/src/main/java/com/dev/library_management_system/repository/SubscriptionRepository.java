package com.dev.library_management_system.repository;

import com.dev.library_management_system.model.Subscription;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface SubscriptionRepository extends JpaRepository<Subscription, Long> {

    // Finds a user's currently active subscription based on today's date
    @Query("SELECT s FROM Subscription s WHERE s.user.id = :userId AND s.isActive = true AND s.startDate <= :today AND s.endDate >= :today")
    Optional<Subscription> findActiveSubscriptionByUserId(@Param("userId") Long userId, @Param("today") LocalDateTime today);

    // Finds subscriptions that have passed their end date but are still incorrectly marked as active = true
    @Query("SELECT s FROM Subscription s WHERE s.isActive = true AND s.endDate < :today")
    List<Subscription> findExpiredActiveSubscriptions(@Param("today") LocalDateTime today);
}