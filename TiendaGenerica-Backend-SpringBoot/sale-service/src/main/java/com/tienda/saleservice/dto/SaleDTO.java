package com.tienda.saleservice.dto;

import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
public class SaleDTO {

    private Long idVenta;

    private String numeroVenta;

    private Long idCliente;

    private Long idUsuario;

    private LocalDateTime fecha;

    private BigDecimal totalBruto;

    private BigDecimal totalIva;

    private BigDecimal totalFinal;

    private String estado;

    private List<SaleDetailDTO> detalles;

    private List<PaymentDTO> pagos;

}
