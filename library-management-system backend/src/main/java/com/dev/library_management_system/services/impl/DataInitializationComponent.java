package com.dev.library_management_system.services.impl;

import com.dev.library_management_system.domain.UserRole;
import com.dev.library_management_system.model.User;
import com.dev.library_management_system.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class DataInitializationComponent implements CommandLineRunner {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        initializeAdminUser();
    }
    private void initializeAdminUser(){
        String adminEmail="deveshjadhav2510@gmail.com";
        String adminPassword="123456";

        if(userRepository.findByEmail(adminEmail)==null){
            User user= User.builder()
                    .password(passwordEncoder.encode(adminPassword))
                    .email(adminEmail)
                    .fullName("Devesh")
                    .role(String.valueOf(UserRole.ROLE_ADMIN))
                    .build();

            User admin =  userRepository.save(user);

        }
    }

}
