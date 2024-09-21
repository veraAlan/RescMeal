package dev.group21.rescmeal.repository;

import dev.group21.rescmeal.model.Business;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BusinessRepository extends JpaRepository<Business, Long> {
    // Queries
//    @Query("SELECT b FROM Business b LEFT JOIN FETCH business_photo WHERE b.id_business = business_photo.id_business")
//    Optional<Business> findByIdWithPhoto(@Param("id_business") Integer id_business);
}