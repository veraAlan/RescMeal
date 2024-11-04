package dev.group21.rescmeal.repository;

import dev.group21.rescmeal.model.Client;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ClientRepository extends JpaRepository<Client, Integer> {
    @Query(value="SELECT c from Client c where c.name = ?1")
    Optional<Client> findByName(String name);
}