package dev.group21.rescmeal.repository;

import dev.group21.rescmeal.model.PurchasedItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

@Repository
public interface PurchasedItemRepository extends JpaRepository<PurchasedItem, Integer> {

    @Query("SELECT p FROM PurchasedItem p WHERE p.purchase.business.id = :businessId")
    List<PurchasedItem> findByBusinessId(@Param("businessId") Integer businessId);
}
