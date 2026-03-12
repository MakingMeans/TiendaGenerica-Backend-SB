package com.tienda.buyservice.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import java.math.BigDecimal;

@Data
public class ProductDTO {

    private Long idProducto;

    @JsonProperty("codigo")
    private String codigoProducto;
    private String nombre;
    private BigDecimal precioVenta;
    private Integer stockActual;
}
