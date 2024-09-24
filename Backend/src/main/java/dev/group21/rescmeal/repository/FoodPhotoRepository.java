package dev.group21.rescmeal.repository;

import dev.group21.rescmeal.model.FoodPhoto;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FoodPhotoRepository extends JpaRepository<FoodPhoto, Integer> {
}
