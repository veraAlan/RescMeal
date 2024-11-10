package dev.group21.rescmeal.repository;

import dev.group21.rescmeal.model.User;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends CrudRepository<User, Long> {
    Optional<User> findByUsername(String username);
    Optional<User> findByEmail(String email);
    Boolean existsByUsername(String username);
    Boolean existsByEmail(String email);

    Optional<User> findByClient_Id(Integer clientId);
    Optional<User> findByBusiness_Id(Integer businessId);
    Optional<User> findByCarrier_Id(Integer carrierId);
}

