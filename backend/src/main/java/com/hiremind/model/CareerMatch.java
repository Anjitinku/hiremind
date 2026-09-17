package com.hiremind.model;
import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity @Table(name = "career_matches")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class CareerMatch {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @OneToOne @JoinColumn(name = "user_id", unique = true)
    private User user;
    private int combinedScore;
    @Column(columnDefinition = "TEXT")
    private String matchedCompaniesJson;
    @Column(columnDefinition = "TEXT")
    private String skillsToLearnJson;
    private Long salaryMin;
    private Long salaryMax;
    private LocalDateTime updatedAt;

    @PreUpdate @PrePersist protected void onUpdate() { updatedAt = LocalDateTime.now(); }
}
