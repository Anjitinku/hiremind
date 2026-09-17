package com.hiremind.dto;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class CodingSubmissionResponse {
    private Long id;
    private Long problemId;
    private String problemTitle;
    private String language;
    private boolean passed;
    private String runtime;
    private String memory;
    private LocalDateTime submittedAt;
}
