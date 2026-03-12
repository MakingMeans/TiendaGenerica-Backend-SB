package com.tienda.catalogservice.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.math.BigDecimal;

@Data
@AllArgsConstructor
public class ProductoResponseDTO {

    private Long idProducto;
    private String codigo;
    private String nombre;
    private String descripcion;

    private BigDecimal precioVenta;
    private BigDecimal iva;

    private Integer stockActual;

    private Boolean activo;
}