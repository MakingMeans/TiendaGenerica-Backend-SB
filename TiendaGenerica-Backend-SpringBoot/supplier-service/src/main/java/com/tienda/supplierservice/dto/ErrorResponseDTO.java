package com.tienda.supplierservice.dto;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
public class ErrorResponseDTO {

    private int status;
    private String message;
    private long timestamp;
}