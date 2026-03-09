package com.tienda.catalogservice.controller;

import com.tienda.catalogservice.dto.*;
import com.tienda.catalogservice.service.ProductoService;

import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.math.BigDecimal;
import java.util.List;

@RestController
@RequestMapping("/catalog")
@RequiredArgsConstructor
public class ProductoController {

    private final ProductoService service;

    @PreAuthorize("hasAnyRole('ADMIN','GERENTE')")
    @GetMapping
    public List<ProductoResponseDTO> getAll() {
        return service.findAll();
    }

    @PreAuthorize("hasAnyRole('ADMIN','GERENTE')")
    @GetMapping("/{id}")
    public ProductoResponseDTO getById(@PathVariable Long id) {
        return service.findById(id);
    }

    @GetMapping("/internal/{id}")
    public ProductoResponseDTO getInternalById(@PathVariable Long id) {
        return service.findById(id);
    }

    @PreAuthorize("hasAnyRole('ADMIN','GERENTE')")
    @PostMapping
    public void create(@RequestBody ProductoRequestDTO dto) {
        service.create(dto);
    }

    @PreAuthorize("hasAnyRole('ADMIN','GERENTE')")
    @PutMapping("/{id}")
    public void update(@PathVariable Long id,
                       @RequestBody ProductoRequestDTO dto) {
        service.update(id, dto);
    }

    @PreAuthorize("hasAnyRole('ADMIN','GERENTE')")
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }

    @PreAuthorize("hasAnyRole('ADMIN','GERENTE')")
    @PostMapping("/upload")
    public void uploadCsv(@RequestParam("file") MultipartFile file) {
        service.uploadCsv(file);
    }
}