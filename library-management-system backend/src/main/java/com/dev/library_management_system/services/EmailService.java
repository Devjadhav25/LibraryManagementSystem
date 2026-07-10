package com.dev.library_management_system.services;

public interface EmailService {

    void sendEmail(String to, String subject, String body);
}
