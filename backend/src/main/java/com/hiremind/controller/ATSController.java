package com.hiremind.controller;

import com.hiremind.dto.ATSResultResponse;
import com.hiremind.model.User;
import com.hiremind.repository.UserRepository;
import com.hiremind.service.ATSService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/ats")
@RequiredArgsConstructor
public class ATSController {

    private final ATSService atsService;
    private final UserRepository userRepository;

    private User currentUser() {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    @PostMapping("/analyze")
    public ResponseEntity<ATSResultResponse> analyzeResume(@RequestParam("file") MultipartFile file) throws IOException {
        return ResponseEntity.ok(atsService.analyzeResume(file, currentUser().getId()));
    }

    @GetMapping("/history")
    public ResponseEntity<List<ATSResultResponse>> getHistory() {
        return ResponseEntity.ok(atsService.getATSResultsByUser(currentUser().getId()));
    }
}
