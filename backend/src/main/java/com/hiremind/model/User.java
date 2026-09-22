package com.hiremind.model;
import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity @Table(name = "users")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class User {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    @Column(unique = true, nullable = false)
    private String email;
    @Column(nullable = false)
    @com.fasterxml.jackson.annotation.JsonProperty(access = com.fasterxml.jackson.annotation.JsonProperty.Access.WRITE_ONLY)
    private String passwordHash;
    @Enumerated(EnumType.STRING)
    private Role role;
    private LocalDateTime createdAt;
    private boolean enabled;

    @PrePersist protected void onCreate() {
        createdAt = LocalDateTime.now(); enabled = true;
    }
}
