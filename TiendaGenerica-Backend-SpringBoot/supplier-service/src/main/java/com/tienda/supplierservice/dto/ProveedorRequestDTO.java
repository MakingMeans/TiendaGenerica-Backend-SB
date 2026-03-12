package com.tienda.supplierservice.dto;

import lombok.Data;

@Data
public class ProveedorRequestDTO {

    private String nit;
    private String nombre;
    private String direccion;
    private String telefono;
    private String ciudad;
    private String email;
    private Boolean activo;
}