package com.hiremind.controller;

import com.hiremind.dto.CareerMatchResponse;
import com.hiremind.dto.ProfileRequest;
import com.hiremind.dto.ProfileResponse;
import com.hiremind.model.User;
import com.hiremind.repository.UserRepository;
import com.hiremind.service.CareerMatchService;
import com.hiremind.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;
    private final CareerMatchService careerMatchService;
    private final UserRepository userRepository;

    private User currentUser() {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    @GetMapping("/me")
    public ResponseEntity<ProfileResponse> getMe() {
        return ResponseEntity.ok(userService.getProfile(currentUser().getId()));
    }

    @PutMapping("/me")
    public ResponseEntity<ProfileResponse> updateMe(@RequestBody ProfileRequest request) {
        return ResponseEntity.ok(userService.updateProfile(currentUser().getId(), request));
    }

    @GetMapping("/{id}/career-match")
    public ResponseEntity<CareerMatchResponse> getCareerMatch(@PathVariable Long id) {
        return ResponseEntity.ok(careerMatchService.getCareerMatch(id));
    }
}
