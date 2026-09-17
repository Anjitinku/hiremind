package com.hiremind.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class HealthResponse {
    private String status;
    private String service;
    private LocalDateTime timestamp;
}
