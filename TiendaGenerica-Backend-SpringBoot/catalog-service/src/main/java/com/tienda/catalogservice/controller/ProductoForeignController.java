package com.tienda.catalogservice.controller;

import com.tienda.catalogservice.dto.*;
import com.tienda.catalogservice.entity.Producto;
import com.tienda.catalogservice.repository.ProductoRepository;
import com.tienda.catalogservice.service.ProductoService;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/foreigncatalog")
@RequiredArgsConstructor
public class ProductoForeignController {
    private final ProductoService service;
    private final ProductoRepository productoRepository;

    @GetMapping("/{id}")
    public ProductoResponseDTO getInternalById(@PathVariable Long id) {
        return service.findById(id);
    }

    @PutMapping("/{id}/stock")
    public void incrementarStock(
            @PathVariable Long id,
            @RequestParam Integer cantidad) {

        service.incrementarStock(id, cantidad);
    }

    @PatchMapping("/{id}/stock")
    public void updateStock(
            @PathVariable Long id,
            @RequestParam Integer cantidad) {

        service.updateStock(id, cantidad);
    }
}