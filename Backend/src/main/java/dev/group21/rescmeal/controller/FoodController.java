/*package dev.group21.rescmeal.controller;

import dev.group21.rescmeal.model.Food;
import dev.group21.rescmeal.repository.FoodRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/foods")
public class FoodController {

    @Autowired
    private FoodRepository foodRepository;

    @GetMapping
    public List<Food> getAllFoods() {
        return foodRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Food> getFoodById(@PathVariable Integer id) {
        Optional<Food> food = foodRepository.findById(id);
        return food.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public Food createFood(@RequestBody Food food) {
        return foodRepository.save(food);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Food> updateFood(@PathVariable Integer id, @RequestBody Food foodDetails) {
        Optional<Food> foodOptional = foodRepository.findById(id);
        if (foodOptional.isPresent()) {
            Food food = foodOptional.get();
            food.setFoodName(foodDetails.getFoodName());
            food.setCategory(foodDetails.getCategory());
            food.setPrice(foodDetails.getPrice());
            food.setDescription(foodDetails.getDescription());
            food.setQuantity(foodDetails.getQuantity());
            food.setExpirationDate(foodDetails.getExpirationDate());
            food.setProductionDate(foodDetails.getProductionDate());
            food.setImage(foodDetails.getImage());
            Food updatedFood = foodRepository.save(food);
            return ResponseEntity.ok(updatedFood);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteFood(@PathVariable Integer id) {
        Optional<Food> food = foodRepository.findById(id);
        if (food.isPresent()) {
            foodRepository.delete(food.get());
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}*/