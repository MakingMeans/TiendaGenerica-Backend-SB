package com.tienda.authenticationservice.service;

import com.tienda.authenticationservice.dto.LoginRequestDTO;
import com.tienda.authenticationservice.dto.LoginResponseDTO;
import com.tienda.authenticationservice.dto.RegisterUserDTO;

public interface AuthService {

    LoginResponseDTO login(LoginRequestDTO request);

    void register(RegisterUserDTO request);
}