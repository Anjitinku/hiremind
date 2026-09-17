package com.hiremind.model;
import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity @Table(name = "interview_sessions")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class InterviewSession {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne @JoinColumn(name = "user_id")
    private User user;
    @Enumerated(EnumType.STRING)
    private InterviewType interviewType;
    @Column(columnDefinition = "TEXT")
    private String transcript;
    private int overallScore;
    private int clarityScore;
    private int relevanceScore;
    private int depthScore;
    private int confidenceScore;
    @Column(columnDefinition = "TEXT")
    private String aiFeedback;
    private LocalDateTime completedAt;

    @PrePersist protected void onCreate() { completedAt = LocalDateTime.now(); }

    public enum InterviewType { TECHNICAL, HR, BEHAVIORAL }
}
