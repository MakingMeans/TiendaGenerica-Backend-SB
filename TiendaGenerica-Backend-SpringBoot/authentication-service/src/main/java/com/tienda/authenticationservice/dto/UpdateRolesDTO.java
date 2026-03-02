package com.tienda.authenticationservice.dto;

import lombok.Data;
import java.util.List;

@Data
public class UpdateRolesDTO {
    private List<String> roles;
}