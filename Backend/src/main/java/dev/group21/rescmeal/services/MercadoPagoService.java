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

    @Value("${mercado-pago.access-token}")
    private String accessToken;

    public String createPreference(Purchase purchase) throws MPException {
        MercadoPago.SDK.setAccessToken(accessToken);

        Preference preference = new Preference();

        for (PurchasedItem item : purchase.getPurchasedItems()) {
            Item preferenceItem = new Item();
            preferenceItem.setTitle(item.getFood().getName())
                    .setQuantity(item.getQuantity())
                    .setUnitPrice((float) item.getPrice());
            preference.appendItem(preferenceItem);
        }

        // Email del pagador (comprador) - Usa un email diferente y específico
        Payer payer = new Payer();
        payer.setEmail("comprador-unico@example.com"); // Email que no sea igual al del negocio
        preference.setPayer(payer);

        preference.save();
        return preference.getSandboxInitPoint();  // Usar Sandbox para pruebas
    }
}