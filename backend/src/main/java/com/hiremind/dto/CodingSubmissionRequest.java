package com.hiremind.dto;

import lombok.Data;

@Data
public class CodingSubmissionRequest {
    private Long problemId;
    private String code;
    private String language;
}
