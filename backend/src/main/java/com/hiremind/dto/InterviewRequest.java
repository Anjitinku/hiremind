package com.hiremind.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class InterviewRequest {
    @NotBlank
    private String transcript;
    private String interviewType;
}
