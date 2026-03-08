package com.tienda.catalogservice.repository;

import com.tienda.catalogservice.entity.ProductoProveedor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface ProductoProveedorRepository extends JpaRepository<ProductoProveedor, Long> {

    List<ProductoProveedor> findByIdProducto(Long idProducto);

    @Transactional
    void deleteByIdProducto(Long idProducto);
}