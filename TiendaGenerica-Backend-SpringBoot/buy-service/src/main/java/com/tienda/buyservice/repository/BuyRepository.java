package com.tienda.buyservice.repository;

import com.tienda.buyservice.entity.Buy;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface BuyRepository extends JpaRepository<Buy, Long>{

    Optional<Buy> findTopByOrderByIdCompraDesc();
}
