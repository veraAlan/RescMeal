package dev.group21.rescmeal.services;

import dev.group21.rescmeal.model.Business;
import dev.group21.rescmeal.repository.BusinessRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class BusinessService {
    private final BusinessRepository businessRepository;

    /**
     * Init methods for Business Service.
     * @param businessRepository Business Repository.
     */
    public BusinessService(BusinessRepository businessRepository) {
        this.businessRepository = businessRepository;
    }

    /**
     * Create a Business entity and BusinessPhoto relation.
     * @param business complete Business entity.
     * @return Business entity
     */
    public Business createBusiness(Business business) {
        return businessRepository.save(business);
    }

    /**
     * Update method, needs a complete Business entity. No null properties.
     * @param updateBusiness Business entity with updated values.
     * @return Business entity
     */
    public Business updateBusiness(Business updateBusiness) {
        return businessRepository.saveAndFlush(updateBusiness);
    }

    // TODO Refactor for new Business Model
//    /**
//     * Update method, works even while sending a partially different Business entity.
//     * @param existingBusiness old Business entity without changed values.
//     * @param updateBusiness updated Business entity, may have null properties.
//     * @return Business entity
//     */
//    public Business dynamicUpdateBusiness(Business existingBusiness, Business updateBusiness) {
//        // Update fields that were sent with some value.
//        if(updateBusiness.getBusiness_name() == null) updateBusiness.setBusiness_name(existingBusiness.getBusiness_name());
//        if(updateBusiness.getBusiness_type() == null) updateBusiness.setBusiness_type(existingBusiness.getBusiness_type());
//        if(updateBusiness.getAddress() == null) updateBusiness.setAddress(existingBusiness.getAddress());
//        if(updateBusiness.getEmail() == null) updateBusiness.setEmail(existingBusiness.getEmail());
//        if(updateBusiness.getPassword() == null) updateBusiness.setPassword(existingBusiness.getPassword());
//        if(updateBusiness.getPhone() == null) updateBusiness.setPhone(existingBusiness.getPhone());
//        if(updateBusiness.getBusiness_time() == null) updateBusiness.setBusiness_time(existingBusiness.getBusiness_time());
//        if(updateBusiness.getCvu() == null) updateBusiness.setCvu(existingBusiness.getCvu());
//        return businessRepository.saveAndFlush(updateBusiness);
//    }

    /**
     * Delete a Business entity by id and its BusinessPhoto relation.
     * @param id Integer id of Business entity.
     */
    public void deleteBusiness(Integer id) {
        businessRepository.deleteById(id);
    }

    /**
     * Get method for Business entity, finds by entity id.
     * @param id Integer id or Business entity.
     * @return Business entity.
     */
    public Business getBusiness(Integer id) {
        return businessRepository.findById(id).orElse(null);
    }

    /**
     * List all Business entity present in database.
     * @return List of Business entities.
     */
    public List<Business> getAllBusiness() {
        return businessRepository.findAll();
    }
}
