package com.tienda.catalogservice.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class ProveedorResponseDTO {

    private Long id;
    private String nit;
    private String nombre;
    private String direccion;
    private String telefono;
    private String ciudad;
    private String email;
    private Boolean activo;
}