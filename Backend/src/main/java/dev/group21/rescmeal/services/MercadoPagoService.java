package dev.group21.rescmeal.services;

import com.mercadopago.MercadoPago;
import com.mercadopago.exceptions.MPException;
import com.mercadopago.resources.Preference;
import com.mercadopago.resources.datastructures.preference.Item;
import com.mercadopago.resources.datastructures.preference.Payer;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import dev.group21.rescmeal.model.Purchase;
import dev.group21.rescmeal.model.PurchasedItem;

@Service
public class MercadoPagoService {

    // Token de acceso de Mercado Pago
    @Value("${mercado-pago.access-token}")
    private String accessToken;

    // Método para crear una preferencia de pago en Mercado Pago
    public String createPreference(Purchase purchase) throws MPException {
        // Configura el token de acceso de Mercado Pago
        MercadoPago.SDK.setAccessToken(accessToken);

        // Crea una nueva preferencia de pago
        Preference preference = new Preference();

        // Itera sobre los ítems de la compra y los añade a la preferencia
        for (PurchasedItem item : purchase.getPurchasedItems()) {
            Item preferenceItem = new Item();
            preferenceItem.setTitle(item.getFood().getName())  // Establece el título del ítem
                    .setQuantity(item.getQuantity())           // Establece la cantidad del ítem
                    .setUnitPrice((float) item.getPrice());    // Establece el precio unitario del ítem
            preference.appendItem(preferenceItem);             // Añade el ítem a la preferencia
        }

        // Configura el email del pagador (comprador)
        Payer payer = new Payer();
        payer.setEmail("comprador-unico@example.com"); // Email específico del comprador
        preference.setPayer(payer);                     // Asocia el pagador a la preferencia

        // Guarda la preferencia de pago
        preference.save();
        // Retorna el punto de inicio de la preferencia en modo Sandbox para pruebas
        return preference.getSandboxInitPoint();
    }
}