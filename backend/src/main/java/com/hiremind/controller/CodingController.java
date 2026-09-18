package com.hiremind.controller;

import com.hiremind.dto.CodingProblemResponse;
import com.hiremind.dto.CodingSubmissionRequest;
import com.hiremind.dto.CodingSubmissionResponse;
import com.hiremind.model.User;
import com.hiremind.repository.UserRepository;
import com.hiremind.service.CodingService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/problems")
@RequiredArgsConstructor
public class CodingController {

    private final CodingService codingService;
    private final UserRepository userRepository;

    private User currentUser() {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    @GetMapping
    public ResponseEntity<List<CodingProblemResponse>> getAllProblems() {
        return ResponseEntity.ok(codingService.getAllProblems());
    }

    @GetMapping("/{id}")
    public ResponseEntity<CodingProblemResponse> getProblem(@PathVariable Long id) {
        return ResponseEntity.ok(codingService.getProblemById(id));
    }

    @PostMapping("/{id}/submit")
    public ResponseEntity<CodingSubmissionResponse> submitSolution(
            @PathVariable Long id,
            @RequestBody CodingSubmissionRequest request) {
        request.setProblemId(id);
        return ResponseEntity.ok(codingService.submitSolution(request, currentUser().getId()));
    }

    @GetMapping("/submissions/mine")
    public ResponseEntity<List<CodingSubmissionResponse>> getMySubmissions() {
        return ResponseEntity.ok(codingService.getMySubmissions(currentUser().getId()));
    }

    @PostMapping
    public ResponseEntity<CodingProblemResponse> createProblem(@RequestBody com.hiremind.dto.CodingProblemRequest request) {
        User user = currentUser();
        if (user.getRole() != com.hiremind.model.Role.ADMIN) {
            throw new org.springframework.security.access.AccessDeniedException("Only Administrators can create coding problems");
        }
        return ResponseEntity.ok(codingService.createProblem(request));
    }

    @PutMapping("/{id}")
    public ResponseEntity<CodingProblemResponse> updateProblem(
            @PathVariable Long id,
            @RequestBody com.hiremind.dto.CodingProblemRequest request) {
        User user = currentUser();
        if (user.getRole() != com.hiremind.model.Role.ADMIN) {
            throw new org.springframework.security.access.AccessDeniedException("Only Administrators can edit coding problems");
        }
        return ResponseEntity.ok(codingService.updateProblem(id, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProblem(@PathVariable Long id) {
        User user = currentUser();
        if (user.getRole() != com.hiremind.model.Role.ADMIN) {
            throw new org.springframework.security.access.AccessDeniedException("Only Administrators can delete coding problems");
        }
        codingService.deleteProblem(id);
        return ResponseEntity.noContent().build();
    }
}
