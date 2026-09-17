package com.hiremind.model;
import jakarta.persistence.*;
import lombok.*;

@Entity @Table(name = "coding_problems")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class CodingProblem {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String title;
    @Enumerated(EnumType.STRING)
    private Difficulty difficulty;
    @Column(columnDefinition = "TEXT")
    private String description;
    @Column(columnDefinition = "TEXT")
    private String examples;
    private String constraints;
    private String tags;
    @Column(columnDefinition = "TEXT")
    private String testCasesJson;
    @Column(columnDefinition = "TEXT")
    private String starterCode;
    private double acceptanceRate;
}
