package dev.group21.rescmeal.repository;

import dev.group21.rescmeal.model.Carrier;
import dev.group21.rescmeal.model.Delivery;
import dev.group21.rescmeal.model.Food;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
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

    @Query("FROM Delivery D WHERE D.carrier.id = :carrierId")
    Page<Delivery> findAllByCarrierId(@Param("carrierId") Long carrierId, Pageable pageable);

}