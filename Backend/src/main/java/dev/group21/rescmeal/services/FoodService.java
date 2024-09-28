package dev.group21.rescmeal.services;

import dev.group21.rescmeal.model.Food;
import dev.group21.rescmeal.repository.FoodRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class FoodService {
    private final FoodRepository foodRepository;

    /**
     * Init methods for Food Service.
     * @param foodRepository Food Repository.
     */
    public FoodService(FoodRepository foodRepository) {
        this.foodRepository = foodRepository;
    }

    /**
     * Create a Food entity.
     * @param food complete Food entity.
     * @return Food entity
     */
    public Food createFood(Food food) {
        return foodRepository.save(food);
    }

    /**
     * Update method, needs a complete Food entity. No null properties.
     * @param updateFood Food entity with updated values.
     * @return Food entity
     */
    public Food updateFood(Food updateFood) {
        return foodRepository.saveAndFlush(updateFood);
    }

    /**
     * Update method, works even while sending a partially different Food entity.
     * @param existingFood old Food entity without changed values.
     * @param updateFood updated Food entity, may have null properties.
     * @return Food entity
     */
    public Food dynamicUpdateFood(Food existingFood, Food updateFood) {
        if (updateFood.getFood_name() == null) updateFood.setFood_name(existingFood.getFood_name());
        if (updateFood.getCategory() == null) updateFood.setCategory(existingFood.getCategory());
        if (updateFood.getPrice() == null) updateFood.setPrice(existingFood.getPrice());
        if (updateFood.getDescription() == null) updateFood.setDescription(existingFood.getDescription());
        if (updateFood.getQuantity() == null) updateFood.setQuantity(existingFood.getQuantity());
        if (updateFood.getExpirationDate() == null) updateFood.setExpirationDate(existingFood.getExpirationDate());
        if (updateFood.getProductionDate() == null) updateFood.setProductionDate(existingFood.getProductionDate());
        if (updateFood.getImage() == null) updateFood.setImage(existingFood.getImage());
        return foodRepository.saveAndFlush(updateFood);
    }

    /**
     * Delete a Food entity by ID.
     * @param id ID of the Food entity to delete.
     */
    public void deleteFood(Integer id) {
        foodRepository.deleteById(id);
    }

    /**
     * Retrieve a Food entity by ID.
     * @param id ID of the Food entity to retrieve.
     * @return Food entity
     */
    public Food getFood(Integer id) {
        return foodRepository.findById(id).orElse(null);
    }

    /**
     * Retrieve all Food entities.
     * @return List of Food entities
     */
    public List<Food> getAllFoods() {
        return foodRepository.findAll();
    }
}
