package com.tienda.supplierservice.service;

import com.tienda.supplierservice.dto.*;

import java.util.List;

public interface ProveedorService {

    List<ProveedorResponseDTO> findAll();

    ProveedorResponseDTO findById(Long id);

    ProveedorResponseDTO findByNit(String nit);

    void create(ProveedorRequestDTO dto);

    void update(Long id, ProveedorRequestDTO dto);

    void delete(Long id);

    void deactivate(Long id);

    List<ProveedorNitNameDTO> findActiveNits();
}