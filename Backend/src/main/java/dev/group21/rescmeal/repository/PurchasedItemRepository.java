package dev.group21.rescmeal.repository;

import dev.group21.rescmeal.model.PurchasedItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Map;

@Repository
public interface PurchasedItemRepository extends JpaRepository<PurchasedItem, Integer> {

    @Query("SELECT p FROM PurchasedItem p WHERE p.business.id = :businessId")
    List<PurchasedItem> findByBusinessId(@Param("businessId") Integer businessId);

    @Query("SELECT p.food.name as name, SUM(p.quantity) as stock FROM PurchasedItem p WHERE p.business.id = :businessId GROUP BY p.food.name")
    List<Map<String, Object>> findStockByBusinessId(@Param("businessId") Integer businessId);

    @Query("SELECT p.food.name as name, SUM(p.price * p.quantity) as revenue FROM PurchasedItem p WHERE p.business.id = :businessId GROUP BY p.food.name")
    List<Map<String, Object>> findRevenueByBusinessId(@Param("businessId") Integer businessId);

    @Query("SELECT p.purchase.client.name as name, COUNT(p.id) as count FROM PurchasedItem p WHERE p.business.id = :businessId GROUP BY p.purchase.client.name")
    List<Map<String, Object>> findCustomersByBusinessId(@Param("businessId") Integer businessId);
}