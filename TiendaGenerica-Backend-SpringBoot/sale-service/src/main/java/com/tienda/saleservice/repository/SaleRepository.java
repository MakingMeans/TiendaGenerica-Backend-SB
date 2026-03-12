package com.tienda.saleservice.repository;

import com.tienda.saleservice.entity.Sale;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface SaleRepository extends JpaRepository<Sale, Long> {

    Optional<Sale> findTopByOrderByIdVentaDesc();

    List<Sale> findByIdCliente(Long idCliente);
}
