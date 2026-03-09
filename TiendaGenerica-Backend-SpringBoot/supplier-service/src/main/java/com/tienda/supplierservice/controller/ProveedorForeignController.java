package com.tienda.supplierservice.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import com.tienda.supplierservice.dto.ProveedorResponseDTO;
import com.tienda.supplierservice.service.ProveedorService;

@RestController
@RequestMapping("/foreignsuppliers")
@RequiredArgsConstructor
public class ProveedorForeignController {
    private final ProveedorService service;
    
    @GetMapping("/{id}")
    public ProveedorResponseDTO getInternalById(@PathVariable Long id) {
        return service.findById(id);
    }
}
