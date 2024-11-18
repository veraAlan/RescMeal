package dev.group21.rescmeal.controller;

import dev.group21.rescmeal.model.Delivery;
import dev.group21.rescmeal.services.DeliveryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
@RestController
@RequestMapping("/api/delivery")
public class DeliveryController {

    private final DeliveryService deliveryService;

    @Autowired
    public DeliveryController(DeliveryService deliveryService) {
        this.deliveryService = deliveryService;
    }

    @GetMapping("/taken")
    public List<Delivery> getTakenDeliveries() {
        return deliveryService.getTakenDeliveries();
    }

    @PostMapping
    public ResponseEntity<Delivery> createDelivery(@RequestBody Delivery delivery) {
        try {
            Delivery createdDelivery = deliveryService.saveDelivery(delivery);
            return ResponseEntity.ok(createdDelivery);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).headers(errorHeader(e)).build();
        }
    }

    @PutMapping
    public ResponseEntity<Delivery> updateDelivery(@RequestBody Delivery newDelivery) {
        try {
            if (deliveryService.getDeliveryById(newDelivery.getId()).isEmpty()) {
                return ResponseEntity.notFound().build();
            }
            return ResponseEntity.ok(deliveryService.saveDelivery(newDelivery));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).headers(errorHeader(e)).build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDelivery(@PathVariable Integer id) {
        try {
            if (id != null) {
                deliveryService.deleteDelivery(id);
                return ResponseEntity.noContent().build();
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).headers(errorHeader(e)).build();
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<Delivery> getDelivery(@PathVariable Integer id) {
        try {
            return deliveryService.getDeliveryById(id)
                    .map(ResponseEntity::ok)
                    .orElseGet(() -> ResponseEntity.notFound().build());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).headers(errorHeader(e)).build();
        }
    }

    @GetMapping("/list")
    public ResponseEntity<List<Delivery>> getAllDeliveries() {
        try {
            List<Delivery> deliveryList = deliveryService.getAllDeliveries();
            if (deliveryList.isEmpty()) {
                return ResponseEntity.notFound().build();
            } else {
                return ResponseEntity.ok(deliveryList);
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).headers(errorHeader(e)).build();
        }
    }

    private HttpHeaders errorHeader(Exception e) {
        System.err.println(e.toString());
        HttpHeaders headers = new HttpHeaders();
        headers.add("X-Error-Message", e.getMessage());
        return headers;
    }
}