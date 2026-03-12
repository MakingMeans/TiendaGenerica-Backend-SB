package com.tienda.buyservice.dto;

import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BuyDTO {

    private Long idCompra;
    private String numeroCompra;
    private Long idProveedor;
    private LocalDateTime fecha;
    private BigDecimal total;
    private String estado;

    private List<BuyDetailsDTO> detalles;
}
