package com.tienda.supplierservice.controller;

import com.tienda.supplierservice.dto.*;
import com.tienda.supplierservice.service.ProveedorService;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/suppliers")
@RequiredArgsConstructor
public class ProveedorController {

    private final ProveedorService service;

    @GetMapping
    public List<ProveedorResponseDTO> getAll() {
        return service.findAll();
    }

    @GetMapping("/{id}")
    public ProveedorResponseDTO getById(@PathVariable Long id) {
        return service.findById(id);
    }

    @GetMapping("/nit/{nit}")
    public ProveedorResponseDTO getByNit(@PathVariable String nit) {
        return service.findByNit(nit);
    }

    @PostMapping
    public void create(@RequestBody ProveedorRequestDTO dto) {
        service.create(dto);
    }

    @PutMapping("/{id}")
    public void update(@PathVariable Long id,
                       @RequestBody ProveedorRequestDTO dto) {
        service.update(id, dto);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }

    @DeleteMapping("/{id}/act")
    public void deactivate(@PathVariable Long id) {
        service.deactivate(id);
    }

    @GetMapping("/active-nits")
    public List<String> getActiveNits() {
        return service.findActiveNits();
    }
}