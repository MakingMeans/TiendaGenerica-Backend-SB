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

    @PutMapping("/codigo/{codigo}/stock")
    public void incrementarStock(
            @PathVariable String codigo,
            @RequestParam Integer cantidad) {

        service.incrementarStock(codigo, cantidad);
    }

    @GetMapping("/codigo/{codigo}")
    public ProductoResponseDTO getInternalByCodigo(@PathVariable String codigo) {
        return service.findByCodigo(codigo);
    }

    @PatchMapping("/codigo/{codigo}/stock")
    public void updateStock(
            @PathVariable String codigo,
            @RequestParam Integer cantidad) {

        service.updateStock(codigo, cantidad);
    }
}