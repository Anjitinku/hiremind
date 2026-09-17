package com.hiremind.dto;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class CareerMatchResponse {
    private Long userId;
    private int combinedScore;
    private String matchedCompanies;
    private String skillsToLearn;
    private Long salaryMin;
    private Long salaryMax;
    private LocalDateTime updatedAt;
}
