package com.hiremind.service;
import com.hiremind.dto.ChatResponse;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;

@Service
public class ChatService {
    public ChatResponse processMessage(String message) {
        String lower = message.toLowerCase();
        String reply;
        if (lower.contains("resume")) reply = "Make sure your resume highlights specific achievements with metrics.";
        else if (lower.contains("interview")) reply = "Use the STAR method for behavioral questions.";
        else if (lower.contains("salary")) reply = "Research market rates for your role and location before negotiating.";
        else if (lower.contains("job")) reply = "Tailor your application to each specific job description.";
        else reply = "Keep learning and applying, you're doing great!";
        return new ChatResponse(reply, LocalDateTime.now());
    }
}
