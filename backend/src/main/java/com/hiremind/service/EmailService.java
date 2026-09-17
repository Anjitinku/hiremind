package com.hiremind.service;
import com.hiremind.model.User;
import com.hiremind.model.Job;
import lombok.RequiredArgsConstructor;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class EmailService {
    private final JavaMailSender mailSender;

    public void sendWelcomeEmail(User user) {
        sendEmail(user.getEmail(), "Welcome to HireMind AI", "Welcome " + user.getName() + "!");
    }
    public void sendInterviewReminder(User user, String date) {
        sendEmail(user.getEmail(), "Interview Reminder", "You have an interview on " + date);
    }
    public void sendApplicationUpdate(User user, Job job, String status) {
        sendEmail(user.getEmail(), "Application Update", "Your application for " + job.getTitle() + " is now " + status);
    }
    private void sendEmail(String to, String subject, String text) {
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setTo(to);
            message.setSubject(subject);
            message.setText(text);
            mailSender.send(message);
        } catch (Exception e) {
            // Log error
        }
    }
}
