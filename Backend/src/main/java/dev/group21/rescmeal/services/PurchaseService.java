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

    /**
     * Guarda una compra.
     * @param purchase La compra a guardar.
     * @return La compra guardada.
     */
    public Purchase savePurchase(Purchase purchase) {
        Purchase savedPurchase = purchaseRepository.save(purchase);

        // Crear una nueva lista para evitar ConcurrentModificationException
        List<PurchasedItem> itemsToModify = new ArrayList<>(savedPurchase.getPurchasedItems());
        for (PurchasedItem item : itemsToModify) {
            item.setPurchase(savedPurchase); // Establecer la relación de compra
            purchasedItemRepository.save(item); // Guardar cada ítem comprado
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

        public Optional<Purchase> getLastPurchaseByClientId(Integer clientId) {
            Pageable pageable = PageRequest.of(0, 1); // Página 0, 1 resultado
            List<Purchase> purchases = purchaseRepository.findFirstByClientIdOrderByCreationDateDesc(clientId, pageable);
            if (purchases.isEmpty()) {
                return Optional.empty();
            } else {
                return Optional.of(purchases.get(0));
            }
        }
}
