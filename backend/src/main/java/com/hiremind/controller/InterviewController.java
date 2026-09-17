package com.hiremind.controller;

import com.hiremind.dto.InterviewRequest;
import com.hiremind.dto.InterviewResponse;
import com.hiremind.model.User;
import com.hiremind.repository.UserRepository;
import com.hiremind.service.InterviewService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/interview")
@RequiredArgsConstructor
public class InterviewController {

    private final InterviewService interviewService;
    private final UserRepository userRepository;

    private User currentUser() {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    @PostMapping("/score")
    public ResponseEntity<InterviewResponse> scoreInterview(@Valid @RequestBody InterviewRequest request) {
        return ResponseEntity.ok(interviewService.scoreInterview(request, currentUser().getId()));
    }

    @GetMapping("/history")
    public ResponseEntity<List<InterviewResponse>> getHistory() {
        return ResponseEntity.ok(interviewService.getInterviewHistory(currentUser().getId()));
    }
}
