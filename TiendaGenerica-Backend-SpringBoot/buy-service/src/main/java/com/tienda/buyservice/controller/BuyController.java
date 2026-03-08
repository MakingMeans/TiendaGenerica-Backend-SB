package com.tienda.buyservice.controller;

import com.tienda.buyservice.dto.BuyDTO;
import com.tienda.buyservice.service.BuyService;

import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/buys")
@RequiredArgsConstructor
@PreAuthorize("hasAnyRole('ADMIN','GERENTE')")
public class BuyController {

    private final BuyService service;

    @GetMapping
    public List<BuyDTO> findAll() {
        return service.findAll();
    }

    @GetMapping("/{id}")
    public BuyDTO findById(@PathVariable Long id) {
        return service.findById(id);
    }

    @PostMapping
    public BuyDTO create(@RequestBody BuyDTO dto) {
        return service.create(dto);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }
}
