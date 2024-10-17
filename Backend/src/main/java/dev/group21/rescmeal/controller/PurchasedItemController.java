package dev.group21.rescmeal.controller;

import dev.group21.rescmeal.model.PurchasedItem;
import dev.group21.rescmeal.services.PurchasedItemService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/purchasedItem")
public class PurchasedItemController {
    @Autowired
    private PurchasedItemService purchasedItemService;

    /**
     * Obtiene todos los ítems comprados.
     * @return Lista de todos los ítems comprados.
     */
    @GetMapping
    public ResponseEntity<List<PurchasedItem>> getAllPurchasedItems() {
        try {
            List<PurchasedItem> purchasedItems = purchasedItemService.getAllPurchasedItems();
            return ResponseEntity.ok(purchasedItems);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).headers(errorHeader(e)).build();
        }
    }

    /**
     * Obtiene un ítem comprado por su ID.
     * @param id ID del ítem comprado.
     * @return La respuesta HTTP con el ítem comprado solicitado.
     */
    @GetMapping("/{id}")
    public ResponseEntity<PurchasedItem> getPurchasedItemById(@PathVariable Integer id) {
        try {
            Optional<PurchasedItem> purchasedItem = purchasedItemService.getPurchasedItemById(id);
            return purchasedItem.map(ResponseEntity::ok)
                    .orElseGet(() -> ResponseEntity.notFound().build());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).headers(errorHeader(e)).build();
        }
    }

    /**
     * Crea un nuevo ítem comprado.
     * @param purchasedItem Detalles del ítem comprado.
     * @return La respuesta HTTP con el ítem comprado creado.
     */
    @PostMapping
    public ResponseEntity<PurchasedItem> createPurchasedItem(@Valid @RequestBody PurchasedItem purchasedItem) {
        try {
            PurchasedItem createdPurchasedItem = purchasedItemService.savePurchasedItem(purchasedItem);
            return ResponseEntity.ok(createdPurchasedItem);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).headers(errorHeader(e)).build();
        }
    }

    /**
     * Actualiza un ítem comprado existente.
     * @param id ID del ítem comprado a actualizar.
     * @param purchasedItemDetails Detalles del ítem comprado actualizados.
     * @return La respuesta HTTP con el ítem comprado actualizado.
     */
    @PutMapping("/{id}")
    public ResponseEntity<PurchasedItem> updatePurchasedItem(@PathVariable Integer id, @Valid @RequestBody PurchasedItem purchasedItemDetails) {
        try {
            Optional<PurchasedItem> purchasedItemOptional = purchasedItemService.getPurchasedItemById(id);
            if (purchasedItemOptional.isPresent()) {
                PurchasedItem purchasedItem = purchasedItemOptional.get();
                purchasedItem.setFood(purchasedItemDetails.getFood());
                purchasedItem.setQuantity(purchasedItemDetails.getQuantity());
                purchasedItem.setPrice(purchasedItemDetails.getPrice());
                final PurchasedItem updatedPurchasedItem = purchasedItemService.savePurchasedItem(purchasedItem);
                return ResponseEntity.ok(updatedPurchasedItem);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).headers(errorHeader(e)).build();
        }
    }

    /**
     * Elimina un ítem comprado por su ID.
     * @param id ID del ítem comprado a eliminar.
     * @return La respuesta HTTP indicando el resultado de la operación.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePurchasedItem(@PathVariable Integer id) {
        try {
            purchasedItemService.deletePurchasedItem(id);
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).headers(errorHeader(e)).build();
        }
    }

    private HttpHeaders errorHeader(Exception e) {
        HttpHeaders headers = new HttpHeaders();
        headers.add("Error-Message", e.getMessage());
        return headers;
    }
}