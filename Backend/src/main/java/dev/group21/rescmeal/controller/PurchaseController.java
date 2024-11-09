package dev.group21.rescmeal.controller;

import dev.group21.rescmeal.model.Purchase;
import dev.group21.rescmeal.model.PurchasedItem;
import dev.group21.rescmeal.services.PurchaseService;
import dev.group21.rescmeal.services.MercadoPagoService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
@RestController
@RequestMapping("/api/purchase")
public class PurchaseController {
    @Autowired
    private PurchaseService purchaseService;

    @Autowired
    private MercadoPagoService mercadoPagoService;

    /**
     * Crea una nueva compra.
     * @param purchase Detalles de la compra.
     * @return La respuesta HTTP con la compra creada.
     */
    @PostMapping
    public ResponseEntity<Object> createPurchase(@Valid @RequestBody Purchase purchase) {
        Purchase newPurchase = purchaseService.savePurchase(purchase);
        return ResponseEntity.ok(newPurchase);
    }

    @PostMapping("/process-payment")
    public ResponseEntity<Object> processPayment(@Valid @RequestBody Purchase purchase) {
        try {
            // Llama al servicio de Mercado Pago para crear una preferencia de pago
            String preferenceUrl = mercadoPagoService.createPreference(purchase);
            return ResponseEntity.ok(preferenceUrl);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

    /**
     * Obtiene todas las compras.
     * @return Lista de todas las compras.
     */
    @GetMapping("/list")
    public List<Purchase> getAllPurchases() {
        return purchaseService.getAllPurchases();
    }

    /**
     * Obtiene una compra por su ID.
     * @param id ID de la compra.
     * @return La respuesta HTTP con la compra solicitada.
     */
    @GetMapping("/{id}")
    public ResponseEntity<Purchase> getPurchaseById(@PathVariable Integer id) {
        Optional<Purchase> purchase = purchaseService.getPurchaseById(id);
        return purchase.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    /**
     * Actualiza una compra existente.
     * @param id ID de la compra a actualizar.
     * @param purchaseDetails Detalles de la compra actualizados.
     * @return La respuesta HTTP con la compra actualizada.
     */
    @PutMapping("/{id}")
    public ResponseEntity<Purchase> updatePurchase(@PathVariable Integer id, @RequestBody Purchase purchaseDetails) {
        Optional<Purchase> optionalPurchase = purchaseService.getPurchaseById(id);
        if (optionalPurchase.isPresent()) {
            updatePurchaseDetails(optionalPurchase.get(), purchaseDetails);
            Purchase updatedPurchase = purchaseService.savePurchase(optionalPurchase.get());
            return ResponseEntity.ok(updatedPurchase);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    private void updatePurchaseDetails(Purchase purchase, Purchase purchaseDetails) {
        purchase.setClient(purchaseDetails.getClient());
        purchase.setBusiness(purchaseDetails.getBusiness());
        purchase.setPayment_method(purchaseDetails.getPayment_method());
        purchase.setTotal_cost(purchaseDetails.getTotal_cost());
        purchase.setPickup(purchaseDetails.getPickup());
        purchase.setCreation_date(purchaseDetails.getCreation_date());

        if (purchase.getPurchasedItems() != null) {
            purchase.getPurchasedItems().clear();
            if (purchaseDetails.getPurchasedItems() != null) {
                for (PurchasedItem item : purchaseDetails.getPurchasedItems()) {
                    item.setPurchase(purchase);
                    purchase.getPurchasedItems().add(item);
                }
            }
        }
    }

    /**
     * Elimina una compra por su ID.
     * @param id ID de la compra a eliminar.
     * @return La respuesta HTTP indicando el resultado de la operación.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePurchase(@PathVariable Integer id) {
        try {
            purchaseService.deletePurchase(id);
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