package com.tienda.authenticationservice.service;

import com.tienda.authenticationservice.dto.LoginRequestDTO;
import com.tienda.authenticationservice.dto.LoginResponseDTO;
import com.tienda.authenticationservice.dto.RegisterUserDTO;

import java.util.List;

public interface AuthService {

    LoginResponseDTO login(LoginRequestDTO request);

    void register(RegisterUserDTO request);

    List<String> getUserRoles(String usernameOrEmail);
}