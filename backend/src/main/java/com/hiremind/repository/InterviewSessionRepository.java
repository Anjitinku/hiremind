package com.hiremind.repository;
import com.hiremind.model.InterviewSession;
import com.hiremind.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
public interface InterviewSessionRepository extends JpaRepository<InterviewSession, Long> {
    List<InterviewSession> findByUserOrderByCompletedAtDesc(User user);
}
