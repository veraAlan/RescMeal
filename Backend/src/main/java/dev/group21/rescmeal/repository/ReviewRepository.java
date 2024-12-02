package dev.group21.rescmeal.repository;

import dev.group21.rescmeal.model.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Long> {
    List<Review> findByClientId(Long clientId);
    List<Review> findByBusinessId(Long businessId);
}