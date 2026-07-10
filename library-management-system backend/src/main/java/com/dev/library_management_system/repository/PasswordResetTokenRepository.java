package com.dev.library_management_system.repository;

import com.dev.library_management_system.model.PasswordResetToken;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PasswordResetTokenRepository extends JpaRepository<PasswordResetToken,Long> {

    Optional<PasswordResetToken> findByToken(String token);
}
