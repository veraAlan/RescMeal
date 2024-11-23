package dev.group21.rescmeal.repository;

import dev.group21.rescmeal.model.Business;
import dev.group21.rescmeal.model.Food;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface FoodRepository extends JpaRepository<Food, Integer> {
    @Query("FROM Food F WHERE F.business = :business")
    Page<Food> findAllByBusinessId(Pageable pageable, Business business);
}