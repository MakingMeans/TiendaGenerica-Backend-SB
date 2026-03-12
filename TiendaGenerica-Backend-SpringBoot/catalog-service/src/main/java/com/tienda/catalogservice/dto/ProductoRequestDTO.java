package com.tienda.catalogservice.dto;

import lombok.Data;
import java.math.BigDecimal;

@Data
public class ProductoRequestDTO {

    private String codigo;
    private String nombre;
    private String descripcion;

    private BigDecimal precioVenta;
    private BigDecimal iva;

    private Integer stockActual;
    private Integer stockMinimo;
    private Integer stockMaximo;
}