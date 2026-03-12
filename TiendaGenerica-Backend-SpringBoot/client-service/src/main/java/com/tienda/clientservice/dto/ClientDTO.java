package com.tienda.clientservice.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ClientDTO {

    private Long idCliente;
    @NotBlank
    private String cedula;
    private String nombre;
    private String apellido;
    private String direccion;
    private String telefono;
    @Email
    private String email;
    private Boolean activo;
}
