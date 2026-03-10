package com.tienda.saleservice.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ClientDTO {

    private Long idCliente;
    private String nombre;
    private String apellido;
    private Boolean activo;

}
