package com.tienda.authenticationservice.controller;

import com.tienda.authenticationservice.service.AuthService;

import lombok.RequiredArgsConstructor;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admin")
@RequiredArgsConstructor
public class AdminController {

    private final AuthService service;

    @PreAuthorize("hasAuthority('ADMIN')")
    @GetMapping("/test")
    public String adminOnly() {
        return "Solo ADMIN puede ver esto";
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @GetMapping("/roles")
    public List<String> getRoles(@RequestParam("user") String usernameOrEmail) {
        return service.getUserRoles(usernameOrEmail);
    }
}