package dev.group21.rescmeal.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import dev.group21.rescmeal.repository.PurchasedItemRepository;
import dev.group21.rescmeal.model.PurchasedItem;

import java.util.List;
import java.util.Map;
import java.util.HashMap;
import java.util.stream.Collectors;

@Service
public class SalesService {

    @Autowired
    private PurchasedItemRepository purchasedItemRepository;

    public Map<String, Object> getSalesData(Integer businessId) {
        // Recuperar los artículos comprados para el negocio dado
        List<PurchasedItem> purchasedItems = purchasedItemRepository.findByBusinessId(businessId);

        // Agrupar por nombre de comida y sumar la cantidad vendida
        Map<String, Integer> foodSales = purchasedItems.stream()
                .collect(Collectors.groupingBy(
                        item -> item.getFood().getName(),
                        Collectors.summingInt(PurchasedItem::getQuantity)
                ));

        // Convertir el mapa a las listas requeridas por el gráfico
        Map<String, Object> salesData = new HashMap<>();
        salesData.put("labels", foodSales.keySet().toArray(new String[0]));
        salesData.put("values", foodSales.values().toArray(new Integer[0]));

        return salesData;
    }
}