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

    @PostMapping
    public ResponseEntity<Business> createBusiness(@Valid @RequestPart("business") String businessJson, @RequestPart(value = "image", required = false) MultipartFile image) {
        try {
            Business business = new ObjectMapper().readValue(businessJson, Business.class);
            if(image != null) {
                BufferedImage originalImage = ImageIO.read(image.getInputStream());
                BufferedImage resizedImage = Scalr.resize(originalImage, 800);
                String extension = image.getContentType().split("/")[1];
                String imagePath = businessImages + business.getName() + "." + extension;
                ImageIO.write(resizedImage, extension, new File(imagePath));
                business.setImage(business.getName() + "." + extension);
            }
            Business createdBusiness = businessService.createBusiness(business);
            return ResponseEntity.ok(createdBusiness);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).headers(errorHeader(e)).build();
        }
    }

    // Requires All info to be updated
    @PutMapping
    public ResponseEntity<Business> updateBusiness(@RequestPart("business") String businessJson, @RequestPart(value = "image") MultipartFile image) {
        try {
            Business newBusiness = new ObjectMapper().readValue(businessJson, Business.class);
            if(businessService.getBusiness(newBusiness.getId()) == null) return ResponseEntity.notFound().build();
            // TODO Refactor
            BufferedImage originalImage = ImageIO.read(image.getInputStream());
            BufferedImage resizedImage = Scalr.resize(originalImage, 800);
            String extension = image.getContentType().split("/")[1];
            String imagePath = businessImages + newBusiness.getName() + "." + extension;
            ImageIO.write(resizedImage, extension, new File(imagePath));
            newBusiness.setImage(newBusiness.getName() + "." + extension);
            return ResponseEntity.ok(businessService.updateBusiness(newBusiness));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).headers(errorHeader(e)).build();
        }
    }

    // Updates only needed entries
    @PatchMapping
    public ResponseEntity<Business> dynamicUpdateBusiness(@RequestPart("business") String businessJson, @RequestPart(value = "image", required = false) MultipartFile image) {
        try {
            System.out.println(image);
            Business newBusiness = new ObjectMapper().readValue(businessJson, Business.class);
            // TODO Refactor

            Business oldBusiness = businessService.getBusiness(newBusiness.getId());
            if(oldBusiness == null) return ResponseEntity.notFound().build();
            if(image != null){
                if(oldBusiness.getImage() != null) {
                    File oldImage = new File(businessImages + oldBusiness.getImage());
                    oldImage.delete();
                }
                BufferedImage originalImage = ImageIO.read(image.getInputStream());
                BufferedImage resizedImage = Scalr.resize(originalImage, 800);
                String extension = image.getContentType().split("/")[1];
                String fileName;
                // TODO Refactor
                if (newBusiness.getName() != null) {
                    fileName = newBusiness.getName() + "." + image.getContentType().split("/")[1];
                } else {
                    fileName = oldBusiness.getName() + "." + image.getContentType().split("/")[1];
                }
                // TODO Refactor
                String imagePath = businessImages + fileName;
                ImageIO.write(resizedImage, extension, new File(imagePath));
                if(newBusiness.getName() != null) {
                    newBusiness.setImage(newBusiness.getName() + "." + extension);
                } else {
                    newBusiness.setImage(oldBusiness.getName() + "." + extension);
                }
            }

            return ResponseEntity.ok(businessService.dynamicUpdateBusiness(oldBusiness, newBusiness));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).headers(errorHeader(e)).build();
        }
    }

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

    @GetMapping("/list")
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
     * Add error message to header and log Exception thrown.
     * @param e Exception thrown
     * @return HttpHeader
     */
    private HttpHeaders errorHeader(Exception e) {
        System.getLogger(e.toString());
        HttpHeaders headers = new HttpHeaders();
        headers.add("X-Error-Message", e.getMessage());
        return headers;
    }
}
