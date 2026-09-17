package com.hiremind.repository;
import com.hiremind.model.ATSResult;
import com.hiremind.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
public interface ATSResultRepository extends JpaRepository<ATSResult, Long> {
    List<ATSResult> findByUserOrderByCreatedAtDesc(User user);
}
