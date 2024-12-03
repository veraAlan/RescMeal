package dev.group21.rescmeal.repository;

import dev.group21.rescmeal.model.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Long> {
    List<Review> findByClientId(Long clientId);
    List<Review> findByBusinessId(Long businessId);



        @Query("SELECT r FROM Review r WHERE r.purchase.id = :purchaseId ORDER BY r.review_date DESC")
        List<Review> findReviewsByPurchaseId(@Param("purchaseId") Long purchaseId);
}