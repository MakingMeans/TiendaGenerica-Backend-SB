package com.tienda.saleservice.dto;

import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
public class PaymentDTO {

    private Long idMetodo;

    private BigDecimal monto;

}
