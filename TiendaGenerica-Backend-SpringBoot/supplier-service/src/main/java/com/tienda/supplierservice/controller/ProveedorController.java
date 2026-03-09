package com.tienda.supplierservice.controller;

import com.tienda.supplierservice.dto.*;
import com.tienda.supplierservice.service.ProveedorService;

import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/suppliers")
@RequiredArgsConstructor
public class ProveedorController {

    private final ProveedorService service;

    @PreAuthorize("hasAnyRole('ADMIN','GERENTE')")
    @GetMapping
    public List<ProveedorResponseDTO> getAll() {
        return service.findAll();
    }

    @PreAuthorize("hasAnyRole('ADMIN','GERENTE')")
    @GetMapping("/{id}")
    public ProveedorResponseDTO getById(@PathVariable Long id) {
        return service.findById(id);
    }

    @GetMapping("/internal/{id}")
    public ProveedorResponseDTO getInternalById(@PathVariable Long id) {
        return service.findById(id);
    }

    @PreAuthorize("hasAnyRole('ADMIN','GERENTE')")
    @GetMapping("/nit/{nit}")
    public ProveedorResponseDTO getByNit(@PathVariable String nit) {
        return service.findByNit(nit);
    }

    @PreAuthorize("hasAnyRole('ADMIN','GERENTE')")
    @PostMapping
    public void create(@RequestBody ProveedorRequestDTO dto) {
        service.create(dto);
    }

    @PreAuthorize("hasAnyRole('ADMIN','GERENTE')")
    @PutMapping("/{id}")
    public void update(@PathVariable Long id,
                       @RequestBody ProveedorRequestDTO dto) {
        service.update(id, dto);
    }

    @PreAuthorize("hasAnyRole('ADMIN','GERENTE')")
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }

    @PreAuthorize("hasAnyRole('ADMIN','GERENTE')")
    @DeleteMapping("/{id}/act")
    public void deactivate(@PathVariable Long id) {
        service.deactivate(id);
    }

    @PreAuthorize("hasAnyRole('ADMIN','GERENTE')")
    @GetMapping("/active-nits")
    public List<String> getActiveNits() {
        return service.findActiveNits();
    }
}