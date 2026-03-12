package com.tienda.saleservice.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Getter
@Setter
@Entity
@Table(name = "ventas")
public class Sale {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_venta")
    private Long idVenta;

    @Column(name = "numero_venta", unique = true)
    private String numeroVenta;

    @Column(name = "id_cliente")
    private Long idCliente;

    @Column(name = "id_usuario")
    private Long idUsuario;

    @Column(name = "fecha")
    private LocalDateTime fecha = LocalDateTime.now();

    @Column(name = "total_bruto")
    private BigDecimal totalBruto;

    @Column(name = "total_iva")
    private BigDecimal totalIva;

    @Column(name = "total_final")
    private BigDecimal totalFinal;

    @Column(name = "estado")
    private String estado;
}
