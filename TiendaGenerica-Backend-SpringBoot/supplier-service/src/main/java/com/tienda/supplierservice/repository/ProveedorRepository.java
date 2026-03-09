package com.tienda.supplierservice.repository;

import com.tienda.supplierservice.entity.Proveedor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;
import java.util.List;

@Repository
public interface ProveedorRepository extends JpaRepository<Proveedor, Long> {

    boolean existsByNit(String nit);

    Optional<Proveedor> findByNit(String nit);

    List<Proveedor> findByActivoTrue();
}