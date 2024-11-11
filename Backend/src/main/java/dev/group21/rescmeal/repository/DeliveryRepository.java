package dev.group21.rescmeal.repository;

import dev.group21.rescmeal.model.Delivery;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DeliveryRepository extends JpaRepository<Delivery, Integer> {

    @Query("SELECT d.purchase.id FROM Delivery d WHERE d.delivery_state = 'Tomado'")
    List<Integer> findTakenPurchaseIds();
}