package com.tienda.authenticationservice.repository;

import com.tienda.authenticationservice.entity.Role;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RoleRepository extends JpaRepository<Role, Integer> {
    Optional<Role> findByNombre(String nombreRol);
}