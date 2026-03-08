package com.tienda.catalogservice.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Getter
@Setter
@Entity
@Table(name = "producto_proveedor")
public class ProductoProveedor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_prod_prov")
    private Long id;

    @Column(name = "id_producto")
    private Long idProducto;

    /* NIT of the supplier; previously stored an internal numeric ID but now we keep the external identifier directly */
    @Column(name = "nit_proveedor")
    private String nitProveedor;

    @Column(name = "precio_compra")
    private BigDecimal precioCompra;

    @Column(name = "fecha_actualizacion")
    private LocalDateTime fechaActualizacion = LocalDateTime.now();
}