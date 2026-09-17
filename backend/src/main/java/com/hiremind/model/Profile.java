package com.hiremind.model;
import jakarta.persistence.*;
import lombok.*;

@Entity @Table(name = "profiles")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class Profile {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @OneToOne @JoinColumn(name = "user_id", unique = true)
    private User user;
    @Column(columnDefinition = "TEXT")
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
