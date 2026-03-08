package com.tienda.catalogservice.repository;

import com.tienda.catalogservice.entity.Producto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface ProductoRepository extends JpaRepository<Producto, Long> {

    Optional<Producto> findByCodigo(String codigo);

    @Query("""
        SELECT DISTINCT p FROM Producto p 
        LEFT JOIN FETCH p.productoProveedores 
        WHERE p.activo = true
        ORDER BY p.idProducto
    """)
    List<Producto> findAllWithProveedores();
}