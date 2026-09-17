package com.hiremind.repository;
import com.hiremind.model.Job;
import com.hiremind.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
public interface JobRepository extends JpaRepository<Job, Long> {
    List<Job> findByIsActiveTrue();
    List<Job> findByPostedBy(User user);
    List<Job> findByTitleContainingIgnoreCase(String title);
}
