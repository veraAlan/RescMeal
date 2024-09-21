package dev.group21.rescmeal.repository;

import dev.group21.rescmeal.model.Business;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BusinessRepository extends JpaRepository<Business, Long> {
    // Queries
}