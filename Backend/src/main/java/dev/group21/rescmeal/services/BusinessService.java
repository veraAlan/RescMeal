package dev.group21.rescmeal.services;

import dev.group21.rescmeal.model.Business;
import dev.group21.rescmeal.repository.BusinessPhotoRepository;
import dev.group21.rescmeal.repository.BusinessRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BusinessService {
    private final BusinessRepository businessRepository;
    private final BusinessPhotoRepository businessPhotoRepository;

    public BusinessService(BusinessRepository businessRepository, BusinessPhotoRepository businessPhotoRepository) {
        this.businessRepository = businessRepository;
        this.businessPhotoRepository = businessPhotoRepository;
    }

    public Business creteBusiness(Business business) {
        return businessRepository.save(business);
    }

    public Business updateBusiness(Business updateBusiness) {
        businessPhotoRepository.saveAndFlush(updateBusiness.getBusinessPhoto());
        return businessRepository.saveAndFlush(updateBusiness);
    }

    public Business dynamicUpdateBusiness(Business existingBusiness, Business updateBusiness) {
        // Update fields that were sent with some value.
        if(updateBusiness.getBusiness_name() == null) updateBusiness.setBusiness_name(existingBusiness.getBusiness_name());
        if(updateBusiness.getBusiness_type() == null) updateBusiness.setBusiness_type(existingBusiness.getBusiness_type());
        if(updateBusiness.getAddress() == null) updateBusiness.setAddress(existingBusiness.getAddress());
        if(updateBusiness.getEmail() == null) updateBusiness.setEmail(existingBusiness.getEmail());
        if(updateBusiness.getPassword() == null) updateBusiness.setPassword(existingBusiness.getPassword());
        if(updateBusiness.getPhone() == null) updateBusiness.setPhone(existingBusiness.getPhone());
        if(updateBusiness.getBusiness_time() == null) updateBusiness.setBusiness_time(existingBusiness.getBusiness_time());
        if(updateBusiness.getCvu() == null) updateBusiness.setCvu(existingBusiness.getCvu());
        // Update photo
        if(updateBusiness.getBusinessPhoto() != null) businessPhotoRepository.saveAndFlush(updateBusiness.getBusinessPhoto());
        return businessRepository.saveAndFlush(updateBusiness);
    }

    public void deleteBusiness(Integer id) {
        businessPhotoRepository.deleteById(id);
        businessRepository.deleteById(id);
    }

    public Business getBusiness(Integer id) {
        return businessRepository.findById(id).orElse(null);
    }

    public List<Business> getAllBusiness() {
        return businessRepository.findAll();
    }
}
