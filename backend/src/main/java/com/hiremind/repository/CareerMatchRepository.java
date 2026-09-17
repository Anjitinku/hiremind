package com.hiremind.repository;
import com.hiremind.model.CareerMatch;
import com.hiremind.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;
public interface CareerMatchRepository extends JpaRepository<CareerMatch, Long> {
    Optional<CareerMatch> findByUser(User user);
}
