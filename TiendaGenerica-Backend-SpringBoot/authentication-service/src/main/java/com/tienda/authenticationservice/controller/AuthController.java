package com.tienda.authenticationservice.controller;

import com.tienda.authenticationservice.dto.*;
import com.tienda.authenticationservice.service.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService service;

    @PostMapping("/login")
    public LoginResponseDTO login(@Valid @RequestBody LoginRequestDTO request) {
        return service.login(request);
    }

    @PostMapping("/signup")
    public void signup(@Valid @RequestBody RegisterUserDTO request){
        service.register(request);
    }
}