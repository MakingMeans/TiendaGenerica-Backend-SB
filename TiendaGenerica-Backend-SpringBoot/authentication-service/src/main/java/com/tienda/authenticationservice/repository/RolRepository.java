package com.tienda.authenticationservice.repository;

import com.tienda.authenticationservice.entity.Rol;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RolRepository extends JpaRepository<Rol, Integer> {
    Optional<Rol> findByNombre(String nombreRol);
}