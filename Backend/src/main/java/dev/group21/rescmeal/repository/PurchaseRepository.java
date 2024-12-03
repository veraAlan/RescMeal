package dev.group21.rescmeal.repository;

import dev.group21.rescmeal.model.Purchase;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface PurchaseRepository extends JpaRepository<Purchase, Integer> {
    @Query("SELECT p FROM Purchase p WHERE p.client.id = :clientId ORDER BY p.creation_date DESC")
    List<Purchase> getAllPurchasesByClientId(@Param("clientId") Integer clientId);
}

