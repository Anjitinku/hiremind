package com.hiremind.dto;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class ApplicationResponse {
    private Long id;
    private Long jobId;
    private String jobTitle;
    private String company;
    private Long applicantId;
    private String applicantName;
    private String status;
    private LocalDateTime appliedAt;
    private String notes;
}
