package com.hiremind.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class JobRequest {
    @NotBlank(message = "Job title is required")
    private String title;

    @NotBlank(message = "Company is required")
    private String company;

    @NotBlank(message = "Description is required")
    private String description;

    private String location;
    private String jobType;
    private Long salaryMin;
    private Long salaryMax;
    private String skillsRequired;
}
