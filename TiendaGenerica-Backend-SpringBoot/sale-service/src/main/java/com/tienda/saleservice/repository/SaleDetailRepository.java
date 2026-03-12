package com.tienda.saleservice.repository;

import com.tienda.saleservice.entity.SaleDetail;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SaleDetailRepository extends JpaRepository<SaleDetail, Long> {

    List<SaleDetail> findByIdVenta(Long idVenta);

    void deleteByIdVenta(Long idVenta);

}
