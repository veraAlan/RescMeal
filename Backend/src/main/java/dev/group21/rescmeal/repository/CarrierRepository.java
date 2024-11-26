package dev.group21.rescmeal.repository;

import dev.group21.rescmeal.model.Carrier;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;


public interface CarrierRepository extends JpaRepository<Carrier, Long> {
    Optional<Carrier> findById(Long id);
}
