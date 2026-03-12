package com.tienda.buyservice.service;

import com.tienda.buyservice.dto.BuyDTO;

import java.util.List;

public interface BuyService {

    List<BuyDTO> findAll();

    BuyDTO findById(Long id);

    BuyDTO create(BuyDTO dto);

    void delete(Long id);
}