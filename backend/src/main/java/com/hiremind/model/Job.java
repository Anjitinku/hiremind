package com.hiremind.model;
import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity @Table(name = "jobs")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class Job {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String title;
    private String company;
    @Column(columnDefinition = "TEXT")
    private String description;
    private String location;
    @Enumerated(EnumType.STRING)
    private JobType jobType;
    private Long salaryMin;
    private Long salaryMax;
    private String skillsRequired;
    @ManyToOne @JoinColumn(name = "posted_by_id")
    private User postedBy;
    private LocalDateTime createdAt;
    private boolean isActive;

    @PrePersist protected void onCreate() {
        createdAt = LocalDateTime.now(); isActive = true;
    }

    public enum JobType { FULL_TIME, PART_TIME, CONTRACT, INTERNSHIP, REMOTE }
}
