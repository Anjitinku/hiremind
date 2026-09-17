package com.hiremind.model;
import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity @Table(name = "applications")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class Application {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne @JoinColumn(name = "applicant_id")
    private User applicant;
    @ManyToOne @JoinColumn(name = "job_id")
    private Job job;
    @Enumerated(EnumType.STRING)
    private ApplicationStatus status;
    private LocalDateTime appliedAt;
    @Column(columnDefinition = "TEXT")
    private String notes;

    @PrePersist protected void onCreate() {
        appliedAt = LocalDateTime.now();
        if (status == null) status = ApplicationStatus.APPLIED;
    }

    public enum ApplicationStatus { APPLIED, REVIEWING, SHORTLISTED, REJECTED, ACCEPTED }
}
