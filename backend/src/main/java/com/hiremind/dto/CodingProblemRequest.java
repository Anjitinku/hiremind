package com.hiremind.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CodingProblemRequest {
    private String title;
    private String difficulty; // EASY, MEDIUM, HARD
    private String description;
    private String examples;
    private String constraints;
    private String tags;
    private String starterCode;
    private String testCasesJson;
    private Double acceptanceRate;
}