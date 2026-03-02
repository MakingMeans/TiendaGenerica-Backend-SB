package com.tienda.authenticationservice.repository;

import com.tienda.authenticationservice.entity.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
    Optional<Usuario> findByEmailUsuario(String emailUsuario);

    Optional<Usuario> findByUsername(String username);

    Optional<Usuario> findByUsernameOrEmailUsuario(String username, String email);

    boolean existsByUsername(String username);
    boolean existsByCedula(String cedula);
    boolean existsByEmailUsuario(String emailUsuario);
}