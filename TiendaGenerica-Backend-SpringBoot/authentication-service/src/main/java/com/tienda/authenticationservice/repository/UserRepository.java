package com.tienda.authenticationservice.repository;

import com.tienda.authenticationservice.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByCorreo(String correo);

    Optional<User> findByUsername(String username);

    Optional<User> findByUsernameOrCorreo(String username, String email);

    boolean existsByUsername(String username);
    boolean existsByCedula(String cedula);
    boolean existsByCorreo(String correo);
}