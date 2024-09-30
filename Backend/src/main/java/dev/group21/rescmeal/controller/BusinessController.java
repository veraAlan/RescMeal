package dev.group21.rescmeal.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import dev.group21.rescmeal.model.Business;
import dev.group21.rescmeal.services.BusinessService;
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
@RequestMapping("/api/business")
public class BusinessController {
    @Value("${businessImages.path}")
    private String businessImagesPath;
    private final BusinessService businessService;

    @Autowired
    public BusinessController(BusinessService businessService) {
        this.businessService = businessService;
    }

    @PostMapping
    public ResponseEntity<Business> createBusiness(@RequestPart("business") String businessJson, @RequestPart("image") MultipartFile image) {
        try {
            Business business = new ObjectMapper().readValue(businessJson, Business.class);
            String imagePath = businessImagesPath + business.getName() + image.getContentType().replace("image/", ".");
            FileOutputStream fout = new FileOutputStream(imagePath);
            fout.write(image.getBytes());
            business.setImage(business.getName() + image.getContentType().replace("image/", "."));
            Business createdBusiness = businessService.createBusiness(business);
            return ResponseEntity.ok(createdBusiness);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).headers(errorHeader(e)).build();
        }
    }

    // TODO Test relative position of images, maybe inside rescmeal root but ignored by git.
    @PutMapping
    public ResponseEntity<Business> updateBusiness(@RequestBody Business newBusiness) {
        try {
            if(businessService.getBusiness(newBusiness.getId()) == null) return ResponseEntity.notFound().build();
            return ResponseEntity.ok(businessService.updateBusiness(newBusiness));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).headers(errorHeader(e)).build();
        }
    }

    // TODO Update function to request images and replace the one located at the businessImages.path
//    @PatchMapping
//    public ResponseEntity<Business> dynamicUpdateBusiness(@RequestBody Business newBusiness) {
//        try {
//        Business oldBusiness = businessService.getBusiness(newBusiness.getId());
//        if(oldBusiness == null) return ResponseEntity.notFound().build();
//        return ResponseEntity.ok(businessService.dynamicUpdateBusiness(oldBusiness, newBusiness));
//        } catch (Exception e) {
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).headers(errorHeader(e)).build();
//        }
//    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBusiness(@PathVariable Integer id) {
        try {
            if(id != null) {
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
