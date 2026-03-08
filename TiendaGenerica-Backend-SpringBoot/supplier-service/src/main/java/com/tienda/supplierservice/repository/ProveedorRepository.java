package com.tienda.supplierservice.repository;

import com.tienda.supplierservice.entity.Proveedor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;
import java.util.List;

@Repository
public interface ProveedorRepository extends JpaRepository<Proveedor, Long> {

    boolean existsByNit(String nit);

    // new method for finding a supplier by its NIT
    Optional<Proveedor> findByNit(String nit);

    // helper for active-nits endpoint
    List<Proveedor> findByActivoTrue();
}