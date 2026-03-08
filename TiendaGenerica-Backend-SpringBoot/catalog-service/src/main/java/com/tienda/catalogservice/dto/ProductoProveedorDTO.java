package com.tienda.catalogservice.dto;

import lombok.Data;
import java.math.BigDecimal;

@Data
public class ProductoProveedorDTO {

    private String nit;
    private BigDecimal precioCompra;
}