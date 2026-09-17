package com.hiremind.dto;

import lombok.Data;
import lombok.Builder;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.time.LocalDateTime;

@Data @Builder @NoArgsConstructor @AllArgsConstructor
public class JobResponse {
    private Long id;
    private String title;
    private String company;
    private String description;
    private String location;
    private String jobType;
    private Long salaryMin;
    private Long salaryMax;
    private String skillsRequired;
    private String postedByName;
    private Long postedById;
    private LocalDateTime createdAt;
    private boolean isActive;
}
