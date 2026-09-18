package com.hiremind.controller;

import com.hiremind.model.Role;
import com.hiremind.model.User;
import com.hiremind.repository.ApplicationRepository;
import com.hiremind.repository.CodingProblemRepository;
import com.hiremind.repository.JobRepository;
import com.hiremind.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
public class AdminController {

    private final UserRepository userRepository;
    private final JobRepository jobRepository;
    private final CodingProblemRepository codingProblemRepository;
    private final ApplicationRepository applicationRepository;

    private User checkAdmin() {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
        if (user.getRole() != Role.ADMIN) {
            throw new AccessDeniedException("Admin role required");
        }
        return user;
    }

    @GetMapping("/stats")
    public ResponseEntity<Map<String, Object>> getStats() {
        checkAdmin();
        Map<String, Object> stats = new HashMap<>();
        stats.put("totalUsers", userRepository.count());
        stats.put("totalJobs", jobRepository.count());
        stats.put("totalProblems", codingProblemRepository.count());
        stats.put("totalApplications", applicationRepository.count());
        return ResponseEntity.ok(stats);
    }

    @GetMapping("/users")
    public ResponseEntity<List<User>> getAllUsers() {
        checkAdmin();
        return ResponseEntity.ok(userRepository.findAll());
    }

    @DeleteMapping("/users/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        checkAdmin();
        userRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}