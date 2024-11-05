package dev.group21.rescmeal.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import dev.group21.rescmeal.services.SalesService;
import java.util.Map;

@RestController
@RequestMapping("/api/business")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class SalesDashboardController {

    @Autowired
    private SalesService salesService;

    @GetMapping("/dashboard")
    public Map<String, Object> getSalesData(@RequestParam Integer businessId) {
        return salesService.getSalesData(businessId);
    }
}