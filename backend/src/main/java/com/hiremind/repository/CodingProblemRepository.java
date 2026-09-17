package com.hiremind.repository;
import com.hiremind.model.CodingProblem;
import com.hiremind.model.Difficulty;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
public interface CodingProblemRepository extends JpaRepository<CodingProblem, Long> {
    List<CodingProblem> findByDifficulty(Difficulty difficulty);
}
