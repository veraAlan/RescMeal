package dev.group21.rescmeal.services;

import dev.group21.rescmeal.model.Purchase;
import dev.group21.rescmeal.model.PurchasedItem;
import dev.group21.rescmeal.repository.PurchaseRepository;
import dev.group21.rescmeal.repository.PurchasedItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.ArrayList;
import java.util.Optional;

/**
 * Servicio para manejar las operaciones relacionadas con Purchase.
 */
@Service
public class PurchaseService {
    @Autowired
    private PurchaseRepository purchaseRepository;

    @Autowired
    private PurchasedItemRepository purchasedItemRepository;

    @Autowired
    private FoodService foodService;

//    /**
//     * Guarda una compra.
//     * @param purchase La compra a guardar.
//     * @return La compra guardada.
//     */
    public Purchase savePurchase(Purchase purchase) throws Exception {
        Purchase savedPurchase = purchaseRepository.save(purchase);

        List<PurchasedItem> itemsToModify = new ArrayList<>(savedPurchase.getPurchasedItems());
        for (PurchasedItem item : itemsToModify) {
            item.setPurchase(savedPurchase);
            purchasedItemRepository.save(item);
            // Reduce el stock de cada alimento comprado
            foodService.reduceStock(item.getFood().getId(), item.getQuantity());
        }
        return savedPurchase;
    }

    /**
     * Obtiene todas las compras.
     * @return Lista de todas las compras.
     */
    public List<Purchase> getAllPurchases() {
        return purchaseRepository.findAll();
    }

    /**
     * Obtiene una compra por su ID.
     * @param id ID de la compra.
     * @return La compra, si se encuentra.
     */
    public Optional<Purchase> getPurchaseById(Integer id) {
        return purchaseRepository.findById(id);
    }

    /**
     * Elimina una compra por su ID.
     * @param id ID de la compra a eliminar.
     */
    public void deletePurchase(Integer id) {
        purchaseRepository.deleteById(id);
    }

    public Optional<Purchase> getPurchaseById(Long id) { return purchaseRepository.findById(id.intValue()); }

    public List<Purchase> getAllPurchasesByClientId(Integer clientId) {
        return purchaseRepository.getAllPurchasesByClientId(clientId);
    }
}

