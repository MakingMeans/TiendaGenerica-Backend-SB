package com.tienda.authenticationservice.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class UserResponseDTO {

    private Long id;
    private String cedula;
    private String nombre;
    private String apellido;
    private String correo;
    private String username;
    private Boolean activo;
    private List<String> roles;
}