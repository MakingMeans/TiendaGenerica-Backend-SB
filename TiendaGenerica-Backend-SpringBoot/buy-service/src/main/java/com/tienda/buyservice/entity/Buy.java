package com.tienda.buyservice.entity;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "compras")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Buy {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_compra")
    private Long idCompra;

    @Column(name = "numero_compra", nullable = false, unique = true)
    private String numeroCompra;

    @Column(name = "id_proveedor", nullable = false)
    private Long idProveedor;

    @Column(name = "fecha")
    private LocalDateTime fecha = LocalDateTime.now();

    @Column(name = "total")
    private BigDecimal total;

    @Column(name = "estado")
    private String estado;

    @OneToMany(mappedBy = "compra", cascade = CascadeType.ALL)
    private List<BuyDetails> detalles;
}
