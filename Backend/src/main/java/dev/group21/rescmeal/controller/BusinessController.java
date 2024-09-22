package dev.group21.rescmeal.controller;

import dev.group21.rescmeal.model.Business;
import dev.group21.rescmeal.services.BusinessService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/business")
public class BusinessController {
    private final BusinessService businessService;

    @Autowired
    public BusinessController(BusinessService businessService) {
        this.businessService = businessService;
    }

    @PostMapping
    public ResponseEntity<Business> createBusiness(@RequestBody Business business) {
        Business createdBusiness = businessService.creteBusiness(business);
        return ResponseEntity.ok(createdBusiness);
    }

    @PutMapping
    public ResponseEntity<Business> updateBusiness(@RequestBody Business newBusiness) {
        if(businessService.getBusiness(newBusiness.getId()) == null) return ResponseEntity.notFound().build();
        return ResponseEntity.ok(businessService.updateBusiness(newBusiness));
    }

    @PatchMapping
    public ResponseEntity<Business> dynamicUpdateBusiness(@RequestBody Business newBusiness) {
        Business oldBusiness = businessService.getBusiness(newBusiness.getId());
        if(oldBusiness == null) return ResponseEntity.notFound().build();
        return ResponseEntity.ok(businessService.dynamicUpdateBusiness(oldBusiness, newBusiness));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBusiness(@PathVariable Integer id) {
        if(id != null) {
            businessService.deleteBusiness(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<Business> getBusiness(@PathVariable Integer id) {
        Business business = businessService.getBusiness(id);
        if(business != null) {
            return ResponseEntity.ok(business);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/list")
    public ResponseEntity<List<Business>> getAllBussiness() {
        List<Business> businessList = businessService.getAllBusiness();

        if(!businessList.isEmpty()) {
            return ResponseEntity.ok(businessList);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
