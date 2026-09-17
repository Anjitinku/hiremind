package com.hiremind.dto;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class ATSResultResponse {
    private Long id;
    private Long userId;
    private int overallScore;
    private int keywordsScore;
    private int formatScore;
    private int skillsScore;
    private int experienceScore;
    private String missingKeywords;
    private String improvementTips;
    private String sectionFeedback;
    private LocalDateTime createdAt;
}
