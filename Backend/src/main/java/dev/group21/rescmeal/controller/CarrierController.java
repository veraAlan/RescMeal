package dev.group21.rescmeal.controller;

import dev.group21.rescmeal.model.Carrier;
import dev.group21.rescmeal.repository.CarrierRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import java.util.List;
import java.util.Optional;


@RestController
@RequestMapping("/carriers")
public class CarrierController {


    @Autowired
    private CarrierRepository carrierRepository;

    @GetMapping
    public List<Carrier> getAllCarriers(){
        return carrierRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Carrier> getCarrierById(@PathVariable Integer id){
        Optional<Carrier> carrier = carrierRepository.findById(id);
        return carrier.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public Carrier createCarrier(@RequestBody Carrier carrier){
        return carrierRepository.save(carrier);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Carrier> updateCarrier(@PathVariable Integer id, @RequestBody Carrier carrierDetails){
        Optional<Carrier> carrier = carrierRepository.findById(id);
        if (carrier.isPresent()){
            Carrier updatedCarrier = carrier.get();
            updatedCarrier.setName(carrierDetails.getName());
            updatedCarrier.setLastName(carrierDetails.getLastName());
            updatedCarrier.setEmail(carrierDetails.getEmail());
            updatedCarrier.setPassword(carrierDetails.getPassword());
            updatedCarrier.setVehicleType(carrierDetails.getVehicleType());
            updatedCarrier.setPhone(carrierDetails.getPhone());
            updatedCarrier.setDate(carrierDetails.getDate());
            Carrier savedCarrier = carrierRepository.save(updatedCarrier);
            return ResponseEntity.ok(savedCarrier);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Carrier> deleteCarrier(@PathVariable Integer id){
        if (carrierRepository.existsById(id)){
            carrierRepository.deleteById(id);
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
