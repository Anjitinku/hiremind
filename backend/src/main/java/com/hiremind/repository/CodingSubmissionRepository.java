package com.hiremind.repository;
import com.hiremind.model.CodingSubmission;
import com.hiremind.model.CodingProblem;
import com.hiremind.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
public interface CodingSubmissionRepository extends JpaRepository<CodingSubmission, Long> {
    List<CodingSubmission> findByUserAndProblem(User user, CodingProblem problem);
    List<CodingSubmission> findByUser(User user);
}
