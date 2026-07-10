package com.dev.library_management_system.model;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.chrono.ChronoLocalDate;
import java.time.temporal.ChronoUnit;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Subscription {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(nullable = false)
    private User user;

    @ManyToOne
    @JoinColumn(nullable = false)
    private SubscriptionPlan plan;

    private String planCode;

    private String planName;

    private Long price;


    @Column(nullable = false)
    private Integer maxBooksAllowed;

    @Column(nullable = false)
    private Integer maxDaysPerBook;

    @Column(nullable = false)
    private LocalDateTime startDate;

    @Column(nullable = false)
    private LocalDateTime endDate;

    private Boolean isActive=true;

    private Boolean autoRenew;

    private LocalDateTime cancelledAt;

    private String cancellationReason;

    private String notes;

    @CreationTimestamp
    @Column(nullable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(nullable = false)
    private LocalDateTime updatedAt;


    public boolean isValid(){
        if(!isActive){
            return false;
        }
        LocalDate today = LocalDate.now();
        return !today.isBefore(ChronoLocalDate.from(startDate)) && !today.isAfter(ChronoLocalDate.from(endDate));
    }

    public boolean isExpired(){
        return LocalDateTime.now().isAfter(endDate);
    }

    public long getDaysRemaining(){
        if(isExpired()){
            return 0;
        }
        return ChronoUnit.DAYS.between(startDate, endDate);
    }

    public void initializeFromPlan(){
        if(plan!=null){
            this.planName=plan.getName();
            this.planCode = plan.getPlanCode();
            this.price = Long.valueOf(plan.getPrice());
            this.maxBooksAllowed = plan.getMaxBooksAllowed();
            this.maxDaysPerBook = plan.getMaxDaysPerBook();

            if (this.startDate == null) {
                this.startDate = LocalDate.now().atStartOfDay();
            }
            calculateEndDate();
        }
    }

    public void calculateEndDate() {
        if (this.plan != null && this.startDate != null) {
            this.endDate = this.startDate.plusDays(this.plan.getDurationDays());
        }
    }
}
