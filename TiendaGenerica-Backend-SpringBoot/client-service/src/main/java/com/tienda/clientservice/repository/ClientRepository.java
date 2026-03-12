package com.tienda.clientservice.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.tienda.clientservice.entity.Client;

import java.util.List;
import java.util.Optional;


public interface ClientRepository extends JpaRepository<Client, Long> {

    Optional<Client> findByCedula(String cedula);

    boolean existsByCedula(String cedula);

    List<Client> findByActivoTrue();
}
