package com.tienda.saleservice.dto;

import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
public class ProductDTO {

    private Long idProducto;

    private String nombre;

    private BigDecimal precioVenta;

    private Integer stockActual;

}
