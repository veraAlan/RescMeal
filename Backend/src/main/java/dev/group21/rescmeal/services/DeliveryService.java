package dev.group21.rescmeal.services;

import dev.group21.rescmeal.model.Delivery;
import dev.group21.rescmeal.repository.DeliveryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class DeliveryService {

    @Autowired
    private DeliveryRepository deliveryRepository;

    public List<Delivery> getAllDeliveries() {
        return deliveryRepository.findAll();
    }

    public Optional<Delivery> getDeliveryById(int id) {
        return deliveryRepository.findById(id);
    }

    public Delivery saveDelivery(Delivery delivery) {
        return deliveryRepository.save(delivery);
    }

    public void deleteDelivery(int id) {
        deliveryRepository.deleteById(id);
    }

    public List<Delivery> getTakenDeliveries() {
            return deliveryRepository.findTakenDeliveries();
        }

    public Optional<Delivery> getDeliveryByPurchaseId(int purchaseId) {
        return deliveryRepository.findByPurchaseId(purchaseId);
    }
}