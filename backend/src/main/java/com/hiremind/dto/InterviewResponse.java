package com.hiremind.dto;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class InterviewResponse {
    private Long id;
    private Long userId;
    private String interviewType;
    private int overallScore;
    private int clarityScore;
    private int relevanceScore;
    private int depthScore;
    private int confidenceScore;
    private String aiFeedback;
    private LocalDateTime completedAt;
}
