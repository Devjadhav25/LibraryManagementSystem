package com.dev.library_management_system.repository;

import com.dev.library_management_system.model.Payment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PaymentRepository extends JpaRepository<Payment, Long> {

        Optional<Payment> findByGatewayOrderId(String gatewayOrderId);


}
