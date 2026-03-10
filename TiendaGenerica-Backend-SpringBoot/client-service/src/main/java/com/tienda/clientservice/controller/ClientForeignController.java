package com.tienda.clientservice.controller;

import com.tienda.clientservice.dto.*;
import com.tienda.clientservice.service.ClientService;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/foreignclient")
@RequiredArgsConstructor

public class ClientForeignController {

    private final ClientService service;

    @GetMapping("/{id}")
    public ClientDTO findById(@PathVariable Long id) {
        return service.findById(id);
    }

}
