package dev.group21.rescmeal.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import dev.group21.rescmeal.repository.PurchasedItemRepository;

import java.util.HashMap;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class SalesService {

    @Autowired
    private PurchasedItemRepository purchasedItemRepository;

    public Map<String, Object> getSalesData(Integer businessId) {
        var purchasedItems = purchasedItemRepository.findByBusinessId(businessId);

        var foodSales = purchasedItems.stream()
                .collect(Collectors.groupingBy(
                        item -> item.getFood().getName(),
                        Collectors.summingInt(item -> item.getQuantity())
                ));

        var salesData = new HashMap<String, Object>();
        salesData.put("labels", foodSales.keySet().toArray(new String[0]));
        salesData.put("values", foodSales.values().toArray(new Integer[0]));

        return salesData;
    }

    public Map<String, Object> getStockData(Integer businessId) {
        var stockItems = purchasedItemRepository.findStockByBusinessId(businessId);

        var stockData = new HashMap<String, Integer>();
        for (var item : stockItems) {
            stockData.put((String) item.get("name"), ((Number) item.get("stock")).intValue());
        }

        var stockInfo = new HashMap<String, Object>();
        stockInfo.put("labels", stockData.keySet().toArray(new String[0]));
        stockInfo.put("values", stockData.values().toArray(new Integer[0]));

        return stockInfo;
    }

    public Map<String, Object> getRevenueData(Integer businessId) {
        var revenueItems = purchasedItemRepository.findRevenueByBusinessId(businessId);

        var revenueData = new HashMap<String, Double>();
        for (var item : revenueItems) {
            revenueData.put((String) item.get("name"), ((Number) item.get("revenue")).doubleValue());
        }

        var revenueInfo = new HashMap<String, Object>();
        revenueInfo.put("labels", revenueData.keySet().toArray(new String[0]));
        revenueInfo.put("values", revenueData.values().toArray(new Double[0]));

        return revenueInfo;
    }

    public Map<String, Object> getCustomerData(Integer businessId) {
        var customerItems = purchasedItemRepository.findCustomersByBusinessId(businessId);

        var customerData = new HashMap<String, Long>();
        for (var item : customerItems) {
            customerData.put((String) item.get("name"), ((Number) item.get("count")).longValue());
        }

        var customerInfo = new HashMap<String, Object>();
        customerInfo.put("labels", customerData.keySet().toArray(new String[0]));
        customerInfo.put("values", customerData.values().toArray(new Long[0]));

        return customerInfo;
    }
}
