package dev.group21.rescmeal.services;


import dev.group21.rescmeal.model.Food;
import dev.group21.rescmeal.model.FoodPhoto;
import dev.group21.rescmeal.repository.FoodPhotoRepository;
import dev.group21.rescmeal.repository.FoodRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class FoodService {
    private final FoodRepository foodRepository;
    private final FoodPhotoRepository foodPhotoRepository;

    public FoodService(FoodRepository foodRepository, FoodPhotoRepository foodPhotoRepository) {
        this.foodRepository = foodRepository;
        this.foodPhotoRepository = foodPhotoRepository;
    }

    public Food createFood(Food food) {
        FoodPhoto foodPhoto = food.getFoodPhoto();
        food.setFoodPhoto(null);
        Food newFood = foodRepository.save(food);
        foodPhoto.setFood(newFood); // Cambiado a setFood
        foodPhotoRepository.save(foodPhoto);

        return newFood;
    }

    public Food updateFood(Food updateFood) {
        foodPhotoRepository.saveAndFlush(updateFood.getFoodPhoto());
        return foodRepository.saveAndFlush(updateFood);
    }

    public Food dynamicUpdateFood(Food existingFood, Food updateFood) {
        if(updateFood.getFoodName() == null) updateFood.setFoodName(existingFood.getFoodName());
        if(updateFood.getCategory() == null) updateFood.setCategory(existingFood.getCategory());
        if(updateFood.getPrice() == null) updateFood.setPrice(existingFood.getPrice());
        if(updateFood.getDescription() == null) updateFood.setDescription(existingFood.getDescription());
        if(updateFood.getQuantity() == null) updateFood.setQuantity(existingFood.getQuantity());
        if(updateFood.getExpirationDate() == null) updateFood.setExpirationDate(existingFood.getExpirationDate());
        if(updateFood.getProductionDate() == null) updateFood.setProductionDate(existingFood.getProductionDate());
        if(updateFood.getFoodPhoto() != null) foodPhotoRepository.saveAndFlush(updateFood.getFoodPhoto());
        return foodRepository.saveAndFlush(updateFood);
    }

    public void deleteFood(Integer id) {
        foodPhotoRepository.deleteById(id);
        foodRepository.deleteById(id);
    }

    public Food getFood(Integer id) {
        return foodRepository.findById(id).orElse(null);
    }

    public List<Food> getAllFood() {
        return foodRepository.findAll();
    }
}
