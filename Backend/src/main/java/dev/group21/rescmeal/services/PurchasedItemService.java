package dev.group21.rescmeal.services;

import dev.group21.rescmeal.model.PurchasedItem;
import dev.group21.rescmeal.repository.PurchasedItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

/**
 * Servicio para manejar las operaciones relacionadas con PurchasedItem.
 */
@Service
public class PurchasedItemService {
    @Autowired
    private PurchasedItemRepository purchasedItemRepository;

    /**
     * Obtiene todos los ítems comprados.
     * @return Lista de todos los ítems comprados.
     */
    public List<PurchasedItem> getAllPurchasedItems() {
        return purchasedItemRepository.findAll();
    }

    /**
     * Obtiene un ítem comprado por su ID.
     * @param id ID del ítem comprado.
     * @return El ítem comprado, si se encuentra.
     */
    public Optional<PurchasedItem> getPurchasedItemById(Integer id) {
        return purchasedItemRepository.findById(id);
    }

    /**
     * Guarda un ítem comprado.
     * @param purchasedItem El ítem comprado a guardar.
     * @return El ítem comprado guardado.
     */
    public PurchasedItem savePurchasedItem(PurchasedItem purchasedItem) {
        return purchasedItemRepository.save(purchasedItem);
    }

    /**
     * Elimina un ítem comprado por su ID.
     * @param id ID del ítem comprado a eliminar.
     */
    public void deletePurchasedItem(Integer id) {
        purchasedItemRepository.deleteById(id);
    }
}