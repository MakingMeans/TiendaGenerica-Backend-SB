package com.tienda.saleservice.service;

import com.tienda.saleservice.dto.SaleDTO;
import com.tienda.saleservice.entity.Sale;

import java.util.List;

public interface SaleService {

    SaleDTO createSale(SaleDTO saleDTO);

    List<SaleDTO> getAllSales();

    SaleDTO getSaleById(Long id);

    void deleteSale(Long id);

    List<SaleDTO> getSalesByClient(Long idCliente);
}
