package com.tienda.saleservice.repository;

import com.tienda.saleservice.entity.Payment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PaymentRepository extends JpaRepository<Payment, Long> {

    List<Payment> findByIdVenta(Long idVenta);

    void deleteByIdVenta(Long idVenta);
}
