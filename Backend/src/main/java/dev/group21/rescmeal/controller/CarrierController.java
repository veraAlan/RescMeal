package dev.group21.rescmeal.controller;

import dev.group21.rescmeal.model.Business;
import dev.group21.rescmeal.model.Carrier;
import dev.group21.rescmeal.services.CarrierService;
import jakarta.validation.Valid;
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

@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
@RestController
@RequestMapping("/api/carrier")
public class CarrierController {

        private final CarrierService carrierService;

        @Autowired
        public CarrierController(CarrierService carrierService) {
            this.carrierService = carrierService;
        }

        @PostMapping
        public ResponseEntity<Carrier> createCarrier(@Valid @RequestBody Carrier carrier) {
            try {
                Carrier createdCarrier = carrierService.createCarrier(carrier);
                return ResponseEntity.ok(createdCarrier);
            } catch (Exception e) {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).headers(errorHeader(e)).build();
            }
        }

        @GetMapping("/list")
        public ResponseEntity<PagedModel<EntityModel<Carrier>>> getAllCarrier(Pageable pageable, PagedResourcesAssembler<Carrier> assembler) {
            try {
                Page<Carrier> carrierPage = carrierService.getAllCarriers(pageable);
                if (carrierPage.isEmpty()) {
                    return ResponseEntity.notFound().build();
                } else {
                    return ResponseEntity.ok(assembler.toModel(carrierPage));
                }
            } catch (Exception e) {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).headers(errorHeader(e)).build();
            }
        }

        @GetMapping("/{id}")
        public ResponseEntity<Carrier> getCarrier(@PathVariable Integer id) {
            try {
                Carrier carrier = carrierService.getCarrier(id);
                if (carrier != null) {
                    return ResponseEntity.ok(carrier);
                } else {
                    return ResponseEntity.notFound().build();
                }
            } catch (Exception e) {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).headers(errorHeader(e)).build();
            }
        }

        @PutMapping
        public ResponseEntity<Carrier> updateCarrier(@Valid @RequestBody Carrier newCarrier) {
            try{
                if (carrierService.getCarrier(newCarrier.getId()) == null) return ResponseEntity.notFound().build();
                return ResponseEntity.ok(carrierService.updateCarrier(newCarrier));
            } catch (Exception e) {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).headers(errorHeader(e)).build();
            }
        }

        @PatchMapping
        public ResponseEntity<Carrier> dynamicUpdateCarrier(@Valid @RequestBody Carrier newCarrier) {
            try {
                Carrier oldCarrier = carrierService.getCarrier(newCarrier.getId());
                if(oldCarrier == null) return ResponseEntity.notFound().build();
                return ResponseEntity.ok(carrierService.dynamicUpdateCarrier(oldCarrier, newCarrier));
            } catch (Exception e) {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).headers(errorHeader(e)).build();
            }
        }

        @DeleteMapping("/{id}")
        public ResponseEntity<Void> deleteCarrier(@PathVariable Integer id) {
            try {
                if(id != null) {
                    carrierService.deleteCarrier(id);
                    return ResponseEntity.noContent().build();
                } else {
                    return ResponseEntity.notFound().build();
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
