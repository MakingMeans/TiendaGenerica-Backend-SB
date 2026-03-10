package com.tienda.buyservice.client;

import com.tienda.buyservice.config.FeignConfig;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestParam;

@FeignClient(
        name = "api-gateway",
        configuration = FeignConfig.class,
        contextId = "productClient"
)
public interface ProductClient {

    @GetMapping("/foreigncatalog/{id}")
    Object getProductById(@PathVariable("id") Long id);

    @PutMapping("/foreigncatalog/{id}/stock")
    void incrementarStock(
            @PathVariable("id") Long id,
            @RequestParam("cantidad") Integer cantidad);
}
