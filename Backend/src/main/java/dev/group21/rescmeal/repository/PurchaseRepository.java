package dev.group21.rescmeal.repository;

import dev.group21.rescmeal.model.Purchase;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.data.domain.Pageable;
import java.util.List;

@Repository
public interface PurchaseRepository extends JpaRepository<Purchase, Integer> {
    @Query("SELECT p FROM Purchase p WHERE p.client.id = :clientId ORDER BY p.creation_date DESC")
    List<Purchase> findFirstByClientIdOrderByCreationDateDesc(@Param("clientId") Integer clientId, Pageable pageable);
}
