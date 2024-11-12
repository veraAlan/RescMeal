package dev.group21.rescmeal.repository;

import dev.group21.rescmeal.model.Business;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface BusinessRepository extends JpaRepository<Business, Integer> {
    Optional<Business> findById(Integer id);
}