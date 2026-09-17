package com.hiremind.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class CodingProblemResponse {
    private Long id;
    private String title;
    private String difficulty;
    private String description;
    private String examples;
    private String constraints;
    private String tags;
    private String starterCode;
    private double acceptanceRate;
}
