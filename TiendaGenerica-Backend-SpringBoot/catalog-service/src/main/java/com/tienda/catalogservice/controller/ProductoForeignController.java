package com.tienda.catalogservice.controller;

import com.tienda.catalogservice.dto.*;
import com.tienda.catalogservice.service.ProductoService;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/foreignsuppliers")
@RequiredArgsConstructor
public class ProductoForeignController {
    private final ProductoService service;

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
}