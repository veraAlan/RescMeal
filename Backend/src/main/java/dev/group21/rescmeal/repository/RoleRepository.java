package dev.group21.rescmeal.repository;

import dev.group21.rescmeal.model.ERole;
import dev.group21.rescmeal.model.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {
    Optional<Role> findByName(ERole name);
}
