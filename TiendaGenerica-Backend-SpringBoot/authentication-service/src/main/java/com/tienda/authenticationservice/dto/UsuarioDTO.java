package com.tienda.authenticationservice.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class UsuarioDTO {

    private Long idUsuario;

    @NotBlank
    private String cedulaUsuario;

    @NotBlank
    private String nombreUsuario;

    @NotBlank
    private String apellidoUsuario;

    @Email
    private String emailUsuario;

    @NotBlank
    @Size(max = 25)
    private String username;

    /*@NotBlank
    @Size(min = 6)
    private String password;*/

    private Boolean activo;

    private List<String> roles;
}