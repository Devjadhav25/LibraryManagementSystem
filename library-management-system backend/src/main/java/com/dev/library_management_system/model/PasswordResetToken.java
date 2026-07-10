package com.dev.library_management_system.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PasswordResetToken {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true,  nullable = false)
    private String token;

    @ManyToOne
    @JoinColumn(name="user_id", nullable = false)
    private User user;

    @Column(nullable = false)
    private LocalDateTime expiryAt;

    public boolean isExpired(){
        return expiryAt.isBefore(LocalDateTime.now());
    }
}
