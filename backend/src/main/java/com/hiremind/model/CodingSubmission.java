package com.hiremind.model;
import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity @Table(name = "coding_submissions")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class CodingSubmission {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne @JoinColumn(name = "user_id")
    private User user;
    @ManyToOne @JoinColumn(name = "problem_id")
    private CodingProblem problem;
    @Column(columnDefinition = "TEXT")
    private String code;
    private String language;
    private boolean passed;
    private String runtime;
    private String memory;
    private LocalDateTime submittedAt;

    @PrePersist protected void onCreate() { submittedAt = LocalDateTime.now(); }
}
