package dev.group21.rescmeal.repository;

import dev.group21.rescmeal.model.Delivery;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface DeliveryRepository extends JpaRepository<Delivery, Integer> {

    @Query("SELECT d FROM Delivery d WHERE d.delivery_state = 'Tomado'")
    List<Delivery> findTakenDeliveries();

    @Query("SELECT d FROM Delivery d WHERE d.purchase.id = :purchaseId")
    Optional<Delivery> findByPurchaseId(@Param("purchaseId") int purchaseId);

}