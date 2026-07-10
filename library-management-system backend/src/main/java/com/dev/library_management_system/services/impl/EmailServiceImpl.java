package com.dev.library_management_system.services.impl;

import com.dev.library_management_system.services.EmailService;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.mail.MailException;
import org.springframework.mail.MailSendException;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor

public class EmailServiceImpl implements EmailService {

    private final JavaMailSender mailSender;


    @Override
    public void sendEmail(String to, String subject, String body) {
        try{
            MimeMessage mimeMessage = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, "utf-8");
            helper.setSubject(subject);
            helper.setText(body,true);
            helper.setTo(to);
            mailSender.send(mimeMessage);

        }catch(MailException  e){
            throw new MailSendException("failed  to send email");
        } catch (MessagingException e) {
            throw new RuntimeException(e);
        }
    }
}
