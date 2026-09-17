package com.hiremind.service;

import com.hiremind.dto.InterviewRequest;
import com.hiremind.dto.InterviewResponse;
import com.hiremind.exception.ResourceNotFoundException;
import com.hiremind.model.InterviewSession;
import com.hiremind.model.User;
import com.hiremind.repository.InterviewSessionRepository;
import com.hiremind.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class InterviewService {

    private final InterviewSessionRepository interviewSessionRepository;
    private final UserRepository userRepository;

    public InterviewResponse scoreInterview(InterviewRequest req, Long userId) {
        InterviewResponse response = mockInterviewScoring(req.getTranscript(), req.getInterviewType(), userId);

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        InterviewSession session = new InterviewSession();
        session.setUser(user);
        session.setInterviewType(InterviewSession.InterviewType.valueOf(req.getInterviewType()));
        session.setTranscript(req.getTranscript());
        session.setOverallScore(response.getOverallScore());
        session.setClarityScore(response.getClarityScore());
        session.setRelevanceScore(response.getRelevanceScore());
        session.setDepthScore(response.getDepthScore());
        session.setConfidenceScore(response.getConfidenceScore());
        session.setAiFeedback(response.getAiFeedback());
        session.setCompletedAt(LocalDateTime.now());
        InterviewSession saved = interviewSessionRepository.save(session);
        response.setId(saved.getId());
        return response;
    }

    private InterviewResponse mockInterviewScoring(String transcript, String type, Long userId) {
        Random rand = new Random();
        int overall    = 70 + rand.nextInt(20);
        int clarity    = 65 + rand.nextInt(25);
        int relevance  = 70 + rand.nextInt(18);
        int depth      = 68 + rand.nextInt(17);
        int confidence = 72 + rand.nextInt(20);

        Map<String, String> feedbackByType = new HashMap<>();
        feedbackByType.put("TECHNICAL",
                "Your technical explanation was clear and structured. Consider elaborating more on system design trade-offs and providing concrete examples from past projects.");
        feedbackByType.put("HR",
                "You communicated your experience well. Focus on using the STAR method (Situation, Task, Action, Result) to make your answers more impactful.");
        feedbackByType.put("BEHAVIORAL",
                "Good use of specific examples. Try to highlight your leadership and collaboration skills more explicitly in future answers.");

        String feedback = feedbackByType.getOrDefault(type,
                "Good overall performance. Keep practicing to improve your confidence and depth of answers.");

        return InterviewResponse.builder()
                .userId(userId)
                .interviewType(type)
                .overallScore(overall)
                .clarityScore(clarity)
                .relevanceScore(relevance)
                .depthScore(depth)
                .confidenceScore(confidence)
                .aiFeedback(feedback)
                .completedAt(LocalDateTime.now())
                .build();
    }

    public List<InterviewResponse> getInterviewHistory(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        return interviewSessionRepository.findByUserOrderByCompletedAtDesc(user).stream()
                .map(s -> InterviewResponse.builder()
                        .id(s.getId())
                        .userId(s.getUser().getId())
                        .interviewType(s.getInterviewType().toString())
                        .overallScore(s.getOverallScore())
                        .clarityScore(s.getClarityScore())
                        .relevanceScore(s.getRelevanceScore())
                        .depthScore(s.getDepthScore())
                        .confidenceScore(s.getConfidenceScore())
                        .aiFeedback(s.getAiFeedback())
                        .completedAt(s.getCompletedAt())
                        .build())
                .collect(Collectors.toList());
    }
}
