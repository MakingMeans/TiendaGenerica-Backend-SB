package com.tienda.authenticationservice.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class UpdateCredentialsDTO {

    @NotBlank
    private String username;

    @NotBlank
    private String password;
}