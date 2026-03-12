package com.tienda.clientservice.controller;

import com.tienda.clientservice.dto.ClientDTO;
import com.tienda.clientservice.dto.ClientIdCedulaDTO;
import com.tienda.clientservice.service.ClientService;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.access.prepost.PreAuthorize;

import java.util.List;

@RestController
@RequestMapping("/clients")
@RequiredArgsConstructor
@PreAuthorize("hasAnyRole('ADMIN','GERENTE')")
public class ClientController {

    private final ClientService service;

    @GetMapping
    public List<ClientDTO> findAll() {
        return service.findAll();
    }

    @GetMapping("/{id}")
    public ClientDTO findById(@PathVariable Long id) {
        return service.findById(id);
    }

    @PostMapping
    public ClientDTO create(@RequestBody ClientDTO dto) {
        return service.create(dto);
    }

    @PutMapping("/{id}")
    public ClientDTO update(@PathVariable Long id,
                            @RequestBody ClientDTO dto) {
        return service.update(id, dto);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }

    @DeleteMapping("/{id}/act")
    public void deactivate(@PathVariable Long id) {
        service.deactivate(id);
    }

    @GetMapping("/active-clients")
    public List<ClientIdCedulaDTO> getActiveClients() {
        return service.findActiveClients();
    }
}
