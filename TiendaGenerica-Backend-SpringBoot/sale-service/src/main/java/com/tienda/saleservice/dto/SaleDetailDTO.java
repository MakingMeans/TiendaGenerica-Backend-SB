package com.tienda.saleservice.dto;

import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
public class SaleDetailDTO {

    private Long idProducto;

    private Integer cantidad;

    private BigDecimal precioUnitario;

    private BigDecimal total;

}
