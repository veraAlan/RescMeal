package dev.group21.rescmeal.repository;

import dev.group21.rescmeal.model.PurchasedItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PurchasedItemRepository extends JpaRepository<PurchasedItem, Integer> {
}
