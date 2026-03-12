package com.tienda.buyservice.client;

import com.tienda.buyservice.config.FeignConfig;
import com.tienda.buyservice.dto.ProductDTO;
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

    @PutMapping("/foreigncatalog/codigo/{codigo}/stock")
    void incrementarStock(
            @PathVariable String codigo,
            @RequestParam("cantidad") Integer cantidad);

    @GetMapping("/foreigncatalog/codigo/{codigo}")
    ProductDTO getProductByCodigo(@PathVariable String codigo);
}
