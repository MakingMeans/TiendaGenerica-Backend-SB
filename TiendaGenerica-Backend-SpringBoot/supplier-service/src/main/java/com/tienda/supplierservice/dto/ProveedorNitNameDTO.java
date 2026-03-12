package com.tienda.supplierservice.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class ProveedorNitNameDTO {

    private Long idProveedor;
    private String nit;
    private String nombre;
}
