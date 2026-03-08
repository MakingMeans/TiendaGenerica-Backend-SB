package com.tienda.catalogservice.controller;

import com.tienda.catalogservice.dto.*;
import com.tienda.catalogservice.service.ProductoService;

import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/catalog")
@RequiredArgsConstructor
@PreAuthorize("hasAnyRole('ADMIN','GERENTE')")
public class ProductoController {

    private final ProductoService service;

    @GetMapping
    public List<ProductoResponseDTO> getAll() {
        return service.findAll();
    }

    @GetMapping("/{id}")
    public ProductoResponseDTO getById(@PathVariable Long id) {
        return service.findById(id);
    }

    @PostMapping
    public void create(@RequestBody ProductoRequestDTO dto) {
        service.create(dto);
    }

    @PutMapping("/{id}")
    public void update(@PathVariable Long id,
                       @RequestBody ProductoRequestDTO dto) {
        service.update(id, dto);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }

    @PostMapping("/upload")
    public void uploadCsv(@RequestParam("file") MultipartFile file) {
        service.uploadCsv(file);
    }
}