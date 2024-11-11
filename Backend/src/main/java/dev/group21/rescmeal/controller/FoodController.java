package dev.group21.rescmeal.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import dev.group21.rescmeal.model.Food;
import dev.group21.rescmeal.services.FoodService;
import jakarta.validation.Valid;
import org.imgscalr.Scalr;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.File;
import java.util.List;

// TODO set CrossOrigin to port 3000 or localhost on a lower level, so it doesn't need to be set in every controller.
// ^^^ Buscar la forma que quede el CrossOrigin y allowCredentials en un solo lugar y que AuthController aun lo mantenga, asi no lo ponemos en cada Controller. Pero esto hace funcionar las cosas de lado de nextjs
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
@RestController
@RequestMapping("/api/food")
public class FoodController {
    private final String foodImages = System.getProperty("user.dir") + "/../Frontend/public/Food/";
    private final FoodService foodService;

    @Autowired
    public FoodController(FoodService foodService) {
        this.foodService = foodService;
    }

    @PostMapping
    public ResponseEntity<Food> createFood(@Valid @RequestPart("food") String foodJson, @RequestPart("image") MultipartFile image) {
        try {
            Food food = new ObjectMapper().readValue(foodJson, Food.class);
            if(image != null) {
                ResponseEntity createdImage = uploadImage(food.getBusiness().getId() + "-" + food.getName(), image);
                food.setImage(createdImage.getBody().toString());
            }
            Food createdFood = foodService.createFood(food);
            return ResponseEntity.ok(createdFood);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).headers(errorHeader(e)).build();
        }
    }

    @PutMapping
    public ResponseEntity<Food> updateFood(@RequestBody Food newFood, @RequestPart(value = "image", required = false) MultipartFile image) {
        try {
            if (foodService.getFood(newFood.getId()) == null) {
                return ResponseEntity.notFound().build();
            }
            if(image != null) {
                ResponseEntity createdImage = uploadImage(newFood.getBusiness().getId() + "-" + newFood.getName(), image);
                newFood.setImage(createdImage.getBody().toString());
            }
            return ResponseEntity.ok(foodService.updateFood(newFood));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).headers(errorHeader(e)).build();
        }
    }

    @PatchMapping
    public ResponseEntity<Food> dynamicUpdateFood(@RequestBody Food newFood, @RequestPart(value = "image", required = false) MultipartFile image) {
        try {
            Food oldFood = foodService.getFood(newFood.getId());
            if (oldFood == null) {
                return ResponseEntity.notFound().build();
            }
            if(image != null) {
                if(oldFood.getImage() != null) {
                    File oldImage = new File(foodImages + oldFood.getImage());
                    oldImage.delete();
                }
                String foodName = newFood.getName() == null ? newFood.getBusiness().getId() + "-" + newFood.getName() : oldFood.getBusiness().getId() + "-" + oldFood.getName();
                ResponseEntity createdImage = uploadImage(foodName, image);
                newFood.setImage(createdImage.getBody().toString());
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

    /**
     * Store image to public folder.
     * @param foodName String of the name the file will have (Business + Food name).
     * @param image MultipartFile Image.
     * @return ResponseEntity with image name as body.
     */
    private ResponseEntity<String> uploadImage(String foodName, MultipartFile image) {
        try {
            BufferedImage originalImage = ImageIO.read(image.getInputStream());
            BufferedImage resizedImage = Scalr.resize(originalImage, 800);
            String extension = image.getContentType().split("/")[1];
            String imagePath = foodImages + foodName + "." + extension;
            ImageIO.write(resizedImage, extension, new File(imagePath));
            return ResponseEntity.ok(foodName + "." + extension);
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
