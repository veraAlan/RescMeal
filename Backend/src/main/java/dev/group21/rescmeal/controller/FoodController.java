package dev.group21.rescmeal.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import dev.group21.rescmeal.model.Business;
import dev.group21.rescmeal.model.Food;
import dev.group21.rescmeal.services.FoodService;
import jakarta.validation.Valid;
import org.imgscalr.Scalr;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PagedResourcesAssembler;
import org.springframework.hateoas.EntityModel;
import org.springframework.hateoas.PagedModel;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.File;
import java.util.List;

@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
@RestController
@RequestMapping("/api/food")
public class FoodController {
    @Autowired
    private final AuthController authController;
    private final String foodImages = System.getProperty("user.dir") + "/../Frontend/public/Food/";
    private final FoodService foodService;

    @Autowired
    public FoodController(AuthController authController, FoodService foodService) {
        this.authController = authController;
        this.foodService = foodService;
    }

    @PostMapping
    public ResponseEntity<Food> createFood(@Valid @RequestPart("food") String foodJson, @RequestPart("image") MultipartFile image) {
        try {
            Food food = new ObjectMapper().readValue(foodJson, Food.class);
            if(image != null) {
                ResponseEntity<String> createdImage = uploadImage(food.getBusiness().getId() + "-" + food.getName(), image);
                food.setImage(createdImage.getBody());
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
                ResponseEntity<String> createdImage = uploadImage(newFood.getBusiness().getId() + "-" + newFood.getName(), image);
                newFood.setImage(createdImage.getBody());
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
                    Boolean deleted = oldImage.delete();
                }
                String foodName = newFood.getName() == null ? newFood.getBusiness().getId() + "-" + newFood.getName() : oldFood.getBusiness().getId() + "-" + oldFood.getName();
                ResponseEntity<String> createdImage = uploadImage(foodName, image);
                newFood.setImage(createdImage.getBody());
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

    @GetMapping("/me")
    public ResponseEntity<PagedModel<EntityModel<Food>>> getBusinessFoods(Pageable pageable, PagedResourcesAssembler<Food> assembler){
        try{
            Business loggedBusiness = authController.getBusiness();
            Page<Food> businessPage = foodService.getBusinessFoods(pageable, loggedBusiness);
            if (businessPage.isEmpty()) {
                return ResponseEntity.notFound().build();
            } else {
                return ResponseEntity.ok(assembler.toModel(businessPage));
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
