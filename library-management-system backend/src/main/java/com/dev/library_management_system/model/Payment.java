package com.dev.library_management_system.model;

import com.dev.library_management_system.domain.PaymentGateway;
import com.dev.library_management_system.domain.PaymentStatus;
import com.dev.library_management_system.domain.PaymentType;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Payment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private User user;

    @ManyToOne
    private Subscription subscription;
    private Long bookLoan;

    private Long fine;

    @Enumerated(EnumType.STRING)
    private PaymentType paymentType;

    @Enumerated(EnumType.STRING)
    private PaymentStatus Status;

    @Enumerated(EnumType.STRING)
    private PaymentGateway gateway;

    private Long amount;

    private String transactionId;

    private String gatewayPaymentId;

    private String gatewayOrderId;

    private String gatewaySignature;

    private String description;
    private String failureReason;

    @CreationTimestamp
    private LocalDateTime initiatedAt;

    private LocalDateTime completedAt;

    @CreationTimestamp
    private LocalDateTime createdAt;

    @UpdateTimestamp
    private LocalDateTime updatedAt;

}
