package com.hiremind.controller;

import com.hiremind.dto.CareerMatchResponse;
import com.hiremind.model.User;
import com.hiremind.repository.UserRepository;
import com.hiremind.service.CareerMatchService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/career-match")
@RequiredArgsConstructor
public class CareerMatchController {

    private final CareerMatchService careerMatchService;
    private final UserRepository userRepository;

    private User currentUser() {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    @GetMapping
    public ResponseEntity<CareerMatchResponse> getCareerMatch() {
        return ResponseEntity.ok(careerMatchService.getCareerMatch(currentUser().getId()));
    }

    @PostMapping("/refresh")
    public ResponseEntity<CareerMatchResponse> refreshCareerMatch() {
        return ResponseEntity.ok(careerMatchService.computeCareerMatch(currentUser().getId()));
    }
}
