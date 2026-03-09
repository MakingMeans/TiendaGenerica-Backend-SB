package com.tienda.buyservice.client;

import com.tienda.buyservice.config.FeignConfig;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestParam;

@FeignClient(
        name = "api-gateway",
        configuration = FeignConfig.class
)
public interface ProductClient {

    @GetMapping("/catalog/internal/{id}")
    Object getProductById(@PathVariable("id") Long id);

    @GetMapping("/suppliers/internal/{id}")
    Object getInternalById(@PathVariable("id") Long id);

    @PutMapping("/catalog/internal/{id}/stock")
    void incrementarStock(
            @PathVariable("id") Long id,
            @RequestParam("cantidad") Integer cantidad);


}
