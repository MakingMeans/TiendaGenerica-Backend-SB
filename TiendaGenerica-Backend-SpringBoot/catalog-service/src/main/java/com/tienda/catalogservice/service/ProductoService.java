package com.tienda.catalogservice.service;

import com.tienda.catalogservice.dto.*;

import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface ProductoService {

    List<ProductoResponseDTO> findAll();

    ProductoResponseDTO findById(Long id);

    void create(ProductoRequestDTO dto);

    void update(Long id, ProductoRequestDTO dto);

    void delete(Long id);

    void deactivate(Long id);

    ProductoResponseDTO findByCodigo(String codigo);

    void uploadCsv(MultipartFile file);

    void incrementarStock(String codigoProducto, Integer cantidad);

    void updateStock(String codigoProducto, Integer cantidad);
}