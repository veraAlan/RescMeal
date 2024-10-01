package dev.group21.rescmeal.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import dev.group21.rescmeal.model.Business;
import dev.group21.rescmeal.model.Food;
import dev.group21.rescmeal.services.FoodService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.FileOutputStream;
import java.util.List;

@RestController
@RequestMapping("/api/foods")
public class FoodController {
    @Value("${foodImages.path}")
    private String foodImagesPath;
    private final FoodService foodService;

    @Autowired
    public FoodController(FoodService foodService) {
        this.foodService = foodService;
    }

    @PostMapping
    public ResponseEntity<Food> createFood(@RequestPart("food") String foodJson, @RequestPart("image") MultipartFile image) {
        try {
            Food food = new ObjectMapper().readValue(foodJson, Food.class);
            String imagePath = foodImagesPath + food.getName() + image.getContentType().replace("image/", ".");
            FileOutputStream fout = new FileOutputStream(imagePath);
            fout.write(image.getBytes());
            fout.close();
            food.setImage(food.getName() + image.getContentType().replace("image/", "."));
            Food createdFood = foodService.createFood(food);
            return ResponseEntity.ok(createdFood);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).headers(errorHeader(e)).build();
        }
    }

    // TODO Test relative position of images, maybe inside rescmeal root but ignored by git.
    @PutMapping
    public ResponseEntity<Food> updateFood(@RequestBody Food newFood) {
        try {
            if (foodService.getFood(newFood.getId()) == null) {
                return ResponseEntity.notFound().build();
            }
            return ResponseEntity.ok(foodService.updateFood(newFood));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).headers(errorHeader(e)).build();
        }
    }

    // TODO Update function to request images and replace the one located at the foodImages.path
    @PatchMapping
    public ResponseEntity<Food> dynamicUpdateFood(@RequestBody Food newFood) {
        try {
            Food oldFood = foodService.getFood(newFood.getId());
            if (oldFood == null) {
                return ResponseEntity.notFound().build();
            }
            return ResponseEntity.ok(foodService.dynamicUpdateFood(oldFood, newFood));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).headers(errorHeader(e)).build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteFood(@PathVariable Integer id) {
        try {
            if (id != null) {
                foodService.deleteFood(id);
                return ResponseEntity.noContent().build();
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).headers(errorHeader(e)).build();
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<Food> getFood(@PathVariable Integer id) {
        try {
            Food food = foodService.getFood(id);
            if (food != null) {
                return ResponseEntity.ok(food);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).headers(errorHeader(e)).build();
        }
    }

    @GetMapping("/list")
    public ResponseEntity<List<Food>> getAllFoods() {
        try {
            List<Food> foodList = foodService.getAllFoods();
            if (foodList.isEmpty()) {
                return ResponseEntity.notFound().build();
            } else {
                return ResponseEntity.ok(foodList);
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).headers(errorHeader(e)).build();
        }
    }

    private HttpHeaders errorHeader(Exception e) {
        System.getLogger(e.toString());
        HttpHeaders headers = new HttpHeaders();
        headers.add("X-Error-Message", e.getMessage());
        return headers;
    }
}
