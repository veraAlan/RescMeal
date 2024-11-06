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

    // Método para obtener los datos de ventas para un negocio específico
    public Map<String, Object> getSalesData(Integer businessId) {
        // Recupera los artículos comprados para el negocio dado
        List<PurchasedItem> purchasedItems = purchasedItemRepository.findByBusinessId(businessId);

        // Agrupa los artículos por nombre de comida y suma la cantidad vendida
        Map<String, Integer> foodSales = purchasedItems.stream()
                .collect(Collectors.groupingBy(
                        item -> item.getFood().getName(), // Agrupa por nombre de comida
                        Collectors.summingInt(PurchasedItem::getQuantity) // Suma la cantidad vendida
                ));

        // Convierte el mapa a las listas requeridas por el gráfico
        Map<String, Object> salesData = new HashMap<>();
        salesData.put("labels", foodSales.keySet().toArray(new String[0])); // Etiquetas para el gráfico
        salesData.put("values", foodSales.values().toArray(new Integer[0])); // Valores para el gráfico

        // Retorna los datos de ventas en formato de mapa
        return salesData;
    }
}