package dev.group21.rescmeal.services;

import dev.group21.rescmeal.model.Carrier;
import dev.group21.rescmeal.repository.CarrierRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;


@Service
@Transactional
public class CarrierService {
    private final CarrierRepository carrierRepository;

    public CarrierService(CarrierRepository carrierRepository) {
        this.carrierRepository = carrierRepository;
    }

    public Carrier createCarrier(Carrier carrier) {
        return carrierRepository.save(carrier);
    }

    public List<Carrier> getAllCarriers() {
        return carrierRepository.findAll();
    }

    public Carrier getCarrier(Integer id) {
        return carrierRepository.findById(id).orElse(null);
    }

    public Carrier updateCarrier(Carrier carrier) {
        return carrierRepository.saveAndFlush(carrier);
    }

    public Carrier dynamicUpdateCarrier(Carrier existingCarrier, Carrier updateCarrier) {
        if (updateCarrier.getName() == null) updateCarrier.setName(existingCarrier.getName());
        if (updateCarrier.getLastName() == null) updateCarrier.setLastName(existingCarrier.getLastName());
        if (updateCarrier.getEmail() == null) updateCarrier.setEmail(existingCarrier.getEmail());
        if (updateCarrier.getPassword() == null) updateCarrier.setPassword(existingCarrier.getPassword());
        if (updateCarrier.getVehicleType() == null) updateCarrier.setVehicleType(existingCarrier.getVehicleType());
        if (updateCarrier.getPhone() == null) updateCarrier.setPhone(existingCarrier.getPhone());
        if (updateCarrier.getDate() == null) updateCarrier.setDate(existingCarrier.getDate());
        return carrierRepository.saveAndFlush(updateCarrier);
    }

    public void deleteCarrier(Integer id) {
        carrierRepository.deleteById(id);
    }
}