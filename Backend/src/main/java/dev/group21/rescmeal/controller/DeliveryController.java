package dev.group21.rescmeal.controller;

import dev.group21.rescmeal.model.Business;
import dev.group21.rescmeal.model.Carrier;
import dev.group21.rescmeal.model.Delivery;
import dev.group21.rescmeal.model.Food;
import dev.group21.rescmeal.services.CarrierService;
import dev.group21.rescmeal.services.DeliveryService;
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

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
@RestController
@RequestMapping("/api/delivery")
public class    DeliveryController {
    @Autowired
    private final AuthController authController;
    private final DeliveryService deliveryService;
    private final CarrierService carrierService;

    @Autowired
    public DeliveryController(AuthController authController, DeliveryService deliveryService, CarrierService carrierService) {
        this.authController = authController;
        this.deliveryService = deliveryService;
        this.carrierService = carrierService;
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

    @PutMapping("/{id}")
    public ResponseEntity<Delivery> updateDelivery(@PathVariable int id, @RequestBody Delivery updatedDelivery) {
        try {
            Optional<Delivery> existingDelivery = deliveryService.getDeliveryById(id);
            if (existingDelivery.isEmpty()) {
                return ResponseEntity.notFound().build();
            }
            updatedDelivery.setId(id);
            return ResponseEntity.ok(deliveryService.saveDelivery(updatedDelivery));
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

    @GetMapping("/carrierByPurchase/{purchaseId}")
    public ResponseEntity<Carrier> getCarrierByPurchaseId(@PathVariable Integer purchaseId) {
        try {
            Optional<Delivery> deliveryOpt = deliveryService.getDeliveryByPurchaseId(purchaseId);
            if (deliveryOpt.isPresent()) {
                Delivery delivery = deliveryOpt.get();
                Carrier carrier = delivery.getCarrier();
                return ResponseEntity.ok(carrier);
            }
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).headers(errorHeader(e)).build();
        }
    }

    @GetMapping("/me")
    public ResponseEntity<PagedModel<EntityModel<Delivery>>> getCarrierDeliverys(Pageable pageable, PagedResourcesAssembler<Delivery> assembler){
        try{
            Carrier loggedCarrier = authController.getCarrier();
            Page<Delivery> carrierPage = deliveryService.getCarrierDeliverys(loggedCarrier.getId(), pageable );
            if (carrierPage.isEmpty()) {
                return ResponseEntity.notFound().build();
            } else {
                return ResponseEntity.ok(assembler.toModel(carrierPage));
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
