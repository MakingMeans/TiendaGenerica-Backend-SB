package com.tienda.authenticationservice.controller;

import com.tienda.authenticationservice.dto.*;
import com.tienda.authenticationservice.service.UserService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admin/users")
@RequiredArgsConstructor
@PreAuthorize("hasRole('ADMIN')")
public class AdminController {

    private final UserService service;

    @GetMapping
    public List<UserResponseDTO> getAll() {
        return service.findAll();
    }

    @GetMapping("/{id}")
    public UserResponseDTO getById(@PathVariable Long id) {
        return service.findById(id);
    }

    @PostMapping
    public void create(@Valid @RequestBody RegisterUserDTO dto) {
        service.create(dto);
    }

    @PutMapping("/{id}")
    public void update(@PathVariable Long id,
                       @Valid @RequestBody UpdateUserDTO dto) {
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

    @PatchMapping("/{id}/roles")
    public void updateRoles(@PathVariable Long id,
                            @RequestBody UpdateRolesDTO dto) {
        service.updateRoles(id, dto.getRoles());
    }

    @PatchMapping("/{id}/credentials")
    public void updateCredentials(@PathVariable Long id,
                                @RequestBody UpdateCredentialsDTO dto) {
        service.updateCredentials(id, dto);
    }
}