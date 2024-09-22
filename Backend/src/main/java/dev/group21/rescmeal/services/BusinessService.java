package dev.group21.rescmeal.services;

import dev.group21.rescmeal.model.Business;
import dev.group21.rescmeal.repository.BusinessRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BusinessService {
    private final BusinessRepository businessRepository;

    public BusinessService(BusinessRepository businessRepository) {
        this.businessRepository = businessRepository;
    }

    public Business creteBusiness(Business business) {
        return businessRepository.save(business);
    }

    // TODO Check update working correctly.
//    public Business updateBusiness(Business business) {
//        return businessRepository.save(business);
//    }

    // TODO Manage deletion of table.

    public Business getBusiness(Integer id) {
        return businessRepository.findById(id).orElse(null);
    }

    public List<Business> getAllBusiness() {
        return businessRepository.findAll();
    }
}
