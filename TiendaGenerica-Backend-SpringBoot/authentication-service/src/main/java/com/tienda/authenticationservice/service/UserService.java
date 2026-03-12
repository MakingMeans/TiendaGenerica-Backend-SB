package com.tienda.authenticationservice.service;

import com.tienda.authenticationservice.dto.*;

import java.util.List;

public interface UserService {

    List<UserResponseDTO> findAll();

    UserResponseDTO findById(Long id);

    void create(RegisterUserDTO dto);

    void update(Long id, UpdateUserDTO dto);

    void delete(Long id);

    void deactivate(Long id);

    void updateRoles(Long id, List<String> roles);

    void updateCredentials(Long id, UpdateCredentialsDTO dto);
}