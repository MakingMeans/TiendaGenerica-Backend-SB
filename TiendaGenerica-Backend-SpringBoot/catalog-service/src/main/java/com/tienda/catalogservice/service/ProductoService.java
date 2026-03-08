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

    void uploadCsv(MultipartFile file);
}