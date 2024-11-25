package dev.group21.rescmeal.services;

import dev.group21.rescmeal.model.Carrier;
import dev.group21.rescmeal.model.Delivery;
import dev.group21.rescmeal.repository.DeliveryRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class DeliveryService {
    private final DeliveryRepository deliveryRepository;

    public DeliveryService(DeliveryRepository deliveryRepository) {
        this.deliveryRepository = deliveryRepository;
    }

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

    public Page<Delivery> getCarrierDeliverys(Long carrierId, Pageable pageable) {
        return deliveryRepository.findAllByCarrierId(carrierId, pageable);
    }
}