package com.hiremind.model;
import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity @Table(name = "ats_results")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class ATSResult {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne @JoinColumn(name = "user_id")
    private User user;
    private int overallScore;
    private int keywordsScore;
    private int formatScore;
    private int skillsScore;
    private int experienceScore;
    @Column(columnDefinition = "TEXT")
    private String missingKeywords;
    @Column(columnDefinition = "TEXT")
    private String improvementTips;
    @Column(columnDefinition = "TEXT")
    private String sectionFeedback;
    private LocalDateTime createdAt;

    @PrePersist protected void onCreate() { createdAt = LocalDateTime.now(); }
}
