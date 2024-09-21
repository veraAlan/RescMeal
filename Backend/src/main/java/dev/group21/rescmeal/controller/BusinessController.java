package dev.group21.rescmeal.controller;

import dev.group21.rescmeal.model.Business;
import dev.group21.rescmeal.repository.BusinessRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/business")
public class BusinessController {
    private final BusinessRepository businessRepository;

    @Autowired
    public BusinessController(BusinessRepository businessRepository) {
        this.businessRepository = businessRepository;
    }

    @PostMapping
    public ResponseEntity<Business> createBusiness(@RequestBody Business business){
        Business storedBusiness = businessRepository.save(business);
        return ResponseEntity.ok(storedBusiness);
    }

    @GetMapping("/{id_business}")
    public ResponseEntity<Business> getBusiness(@PathVariable Long id_business) {
        Business business = businessRepository.findById(id_business)
                .orElse(null);
        if(business != null) {
            return ResponseEntity.ok(business);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/list")
    public ResponseEntity<List<Business>> getAllBussiness() {
        List<Business> businessList = businessRepository.findAll();

        if(!businessList.isEmpty()) {
            return ResponseEntity.ok(businessList);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
