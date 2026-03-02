package com.tienda.authenticationservice.repository;

import com.tienda.authenticationservice.entity.UsuarioRol;
import com.tienda.authenticationservice.entity.UsuarioRolId;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UsuarioRolRepository extends JpaRepository<UsuarioRol, UsuarioRolId> {
}
