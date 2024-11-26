package dev.group21.rescmeal.services;

import dev.group21.rescmeal.model.Carrier;
import dev.group21.rescmeal.repository.CarrierRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;


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

    public Page<Carrier> getAllCarriers(Pageable parameters) {
        return carrierRepository.findAll(parameters);
    }

    public Carrier getCarrier(Long id) {
        return carrierRepository.findById(id).orElse(null);
    }

    public Carrier updateCarrier(Carrier carrier) {
        return carrierRepository.saveAndFlush(carrier);
    }

    public Carrier dynamicUpdateCarrier(Carrier existingCarrier, Carrier updateCarrier) {
        if (updateCarrier.getName() == null) updateCarrier.setName(existingCarrier.getName());
        if (updateCarrier.getLast_name() == null) updateCarrier.setLast_name(existingCarrier.getLast_name());
        if (updateCarrier.getVehicle_type() == null) updateCarrier.setVehicle_type(existingCarrier.getVehicle_type());
        if (updateCarrier.getPhone() == null) updateCarrier.setPhone(existingCarrier.getPhone());
        if (updateCarrier.getBirthdate() == null) updateCarrier.setBirthdate(existingCarrier.getBirthdate());
        return carrierRepository.saveAndFlush(updateCarrier);
    }

    public void deleteCarrier(Long id) {
        carrierRepository.deleteById(id);
    }

    public Optional<Carrier> getCarrierById(Long id) { return carrierRepository.findById(id); }
}
