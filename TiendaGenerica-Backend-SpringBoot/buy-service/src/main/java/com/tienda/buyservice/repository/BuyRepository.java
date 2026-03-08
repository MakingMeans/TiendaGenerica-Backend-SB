package com.tienda.buyservice.repository;

import com.tienda.buyservice.entity.Buy;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BuyRepository extends JpaRepository<Buy, Long>{
}
