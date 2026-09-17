package com.hiremind.dto;

import lombok.Data;
import lombok.Builder;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Data @Builder @NoArgsConstructor @AllArgsConstructor
public class ProfileResponse {
    private Long id;
    private Long userId;
    private String name;
    private String email;
    private String bio;
    private String title;
    private String location;
    private String phone;
    private String linkedinUrl;
    private String githubUrl;
    private String skills;
    private String resumeUrl;
    private String avatarUrl;
    private int yearsOfExperience;
}
