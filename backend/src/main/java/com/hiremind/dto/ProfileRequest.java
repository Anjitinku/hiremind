package com.hiremind.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class ProfileRequest {
    private String bio;
    private String title;
    private String location;
    private String phone;
    private String linkedinUrl;
    private String githubUrl;
    private String skills;
    private int yearsOfExperience;
}
