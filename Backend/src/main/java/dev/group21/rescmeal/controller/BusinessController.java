package dev.group21.rescmeal.controller;

import jakarta.validation.Valid;
import org.imgscalr.Scalr;
import java.awt.image.BufferedImage;
import javax.imageio.ImageIO;
import com.fasterxml.jackson.databind.ObjectMapper;
import dev.group21.rescmeal.model.Business;
import dev.group21.rescmeal.services.BusinessService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.util.List;

@RestController
@RequestMapping("/api/business")
public class BusinessController {
    private final String businessImages = System.getProperty("user.dir") + "/../Frontend/public/Business/";
    private final BusinessService businessService;

    @Autowired
    public BusinessController(BusinessService businessService) {
        this.businessService = businessService;
    }

    /**
     * Create a new business with validated inputs and a possible image.
     * @param businessJson String (JSON formatted).
     * @param image MultipartFile image.
     * @return ResponseEntity business created.
     */
    @PostMapping
    public ResponseEntity<Business> createBusiness(@Valid @RequestPart("business") String businessJson, @RequestPart(value = "image", required = false) MultipartFile image) {
        try {
            @Valid Business business = new ObjectMapper().readValue(businessJson, Business.class);
            if(image != null) {
                ResponseEntity createdImage = uploadImage(business.getName(), image);
                business.setImage(createdImage.getBody().toString());
            }
            Business createdBusiness = businessService.createBusiness(business);
            return ResponseEntity.ok(createdBusiness);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).headers(errorHeader(e)).build();
        }
    }

    /**
     * Update business using a complete new Business JSON and an image.
     * @param businessJson String (JSON formatted)
     * @param image MultipartFile image
     * @return ResponseEntity business updated.
     */
    @PutMapping
    public ResponseEntity<Business> updateBusiness(@RequestPart("business") String businessJson, @RequestPart(value = "image") MultipartFile image) {
        try {
            Business newBusiness = new ObjectMapper().readValue(businessJson, Business.class);
            if(businessService.getBusiness(newBusiness.getId()) == null) return ResponseEntity.notFound().build();
            if(image != null) {
                ResponseEntity createdImage = uploadImage(newBusiness.getName(), image);
                newBusiness.setImage(createdImage.getBody().toString());
            }
            return ResponseEntity.ok(businessService.updateBusiness(newBusiness));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).headers(errorHeader(e)).build();
        }
    }

    /**
     * Dynamically update a business with a partial Business JSON and an Optional image.
     * @param businessJson String (JSON formatted)
     * @param image MultipartFile image
     * @return ResponseEntity business updated.
     */
    @PatchMapping
    public ResponseEntity<Business> dynamicUpdateBusiness(@RequestPart("business") String businessJson, @RequestPart(value = "image", required = false) MultipartFile image) {
        try {
            System.out.println(image);
            Business newBusiness = new ObjectMapper().readValue(businessJson, Business.class);

            Business oldBusiness = businessService.getBusiness(newBusiness.getId());
            if(oldBusiness == null) return ResponseEntity.notFound().build();
            if(image != null) {
                if(oldBusiness.getImage() != null) {
                    File oldImage = new File(businessImages + oldBusiness.getImage());
                    oldImage.delete();
                }
                String businessName = newBusiness.getName() == null ? oldBusiness.getName() : newBusiness.getName();
                ResponseEntity createdImage = uploadImage(businessName, image);
                newBusiness.setImage(createdImage.getBody().toString());
            }

            return ResponseEntity.ok(businessService.dynamicUpdateBusiness(oldBusiness, newBusiness));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).headers(errorHeader(e)).build();
        }
    }

    /**
     * Deletes a complete business entry, with their image if found.
     * @param id Integer, id of entry to delete
     * @return ResponseEntity<Void>
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBusiness(@PathVariable Integer id) {
        try {
            if (id != null) {
                Business business = businessService.getBusiness(id);
                if (business == null) {
                    return ResponseEntity.notFound().build();
                }
                businessService.deleteBusiness(id);
                return ResponseEntity.noContent().build();
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).headers(errorHeader(e)).build();
        }
    }

    /**
     * Find a specific business by ID.
     * @param id Integer id of Business entity.
     * @return ResponseEntity Business object.
     */
    @GetMapping("/{id}")
    public ResponseEntity<Business> getBusiness(@PathVariable Integer id) {
        try {
            Business business = businessService.getBusiness(id);
            if (business != null) {
                return ResponseEntity.ok(business);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).headers(errorHeader(e)).build();
        }
    }

    /**
     * Get all the business stored in the Database.
     * @return ResponseEntity List of all business found.
     */
    @GetMapping()
    public ResponseEntity<List<Business>> getAllBussiness() {
        try {
            List<Business> businessList = businessService.getAllBusiness();
            if (businessList.isEmpty()) {
                return ResponseEntity.notFound().build();
            } else {
                return ResponseEntity.ok(businessList);
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).headers(errorHeader(e)).build();
        }
    }

    /**
     * Store image to public folder.
     * @param businessName String of the name the file will have (Business name).
     * @param image MultipartFile Image.
     * @return ResponseEntity with image name as body.
     */
    private ResponseEntity<String> uploadImage(String businessName, MultipartFile image) {
        try {
            BufferedImage originalImage = ImageIO.read(image.getInputStream());
            BufferedImage resizedImage = Scalr.resize(originalImage, 800);
            String extension = image.getContentType().split("/")[1];
            String imagePath = businessImages + businessName + "." + extension;
            ImageIO.write(resizedImage, extension, new File(imagePath));
            return ResponseEntity.ok(businessName + "." + extension);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).headers(errorHeader(e)).build();
        }
    }

    /**
     * Add error message to header and log Exception thrown.
     * @param e Exception thrown.
     * @return HttpHeader with custom error entry.
     */
    private HttpHeaders errorHeader(Exception e) {
        System.getLogger(e.toString());
        HttpHeaders headers = new HttpHeaders();
        headers.add("X-Error-Message", e.getMessage());
        return headers;
    }
}
