package dev.group21.rescmeal.services;

import com.mercadopago.MercadoPago;
import com.mercadopago.exceptions.MPException;
import com.mercadopago.resources.Payment;
import com.mercadopago.resources.Preference;
import com.mercadopago.resources.datastructures.preference.BackUrls;
import com.mercadopago.resources.datastructures.preference.Item;
import com.mercadopago.resources.datastructures.preference.Payer;
import dev.group21.rescmeal.model.Purchase;
import dev.group21.rescmeal.model.PurchasedItem;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class MercadoPagoService {

    @Value("${mercado-pago.access-token}")
    private String accessToken;

    public String createPreference(Purchase purchase, String userEmail) throws MPException {
        MercadoPago.SDK.setAccessToken(accessToken);
        Preference preference = new Preference();

        // URLs de redirección configuradas para localhost:3000
        BackUrls backUrls = new BackUrls(
                "http://localhost:3000/",
                "http://localhost:3000/",
                "http://localhost:3000/"
        );
        preference.setBackUrls(backUrls);
        preference.setAutoReturn(Preference.AutoReturn.approved);

        Payer payer = new Payer();
        payer.setEmail(userEmail);
        preference.setPayer(payer);

        for (PurchasedItem item : purchase.getPurchasedItems()) {
            Item preferenceItem = new Item();
            preferenceItem.setTitle(item.getFood().getName())
                    .setQuantity(item.getQuantity())
                    .setUnitPrice((float) item.getPrice());
            preference.appendItem(preferenceItem);
        }

        preference.save();
        return preference.getSandboxInitPoint();
    }

    public boolean isPaymentApproved(String paymentId) throws MPException {
        Payment payment = Payment.findById(paymentId);
        return payment.getStatus().toString().equals("approved");
    }
}