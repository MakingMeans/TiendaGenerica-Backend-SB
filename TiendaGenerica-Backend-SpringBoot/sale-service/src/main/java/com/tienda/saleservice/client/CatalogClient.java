package com.tienda.saleservice.client;

import com.tienda.saleservice.config.FeignConfig;
import com.tienda.saleservice.dto.ProductDTO;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.*;

@FeignClient(
        name = "api-gateway",
        configuration = FeignConfig.class,
        contextId = "catalogClient"
)
public interface CatalogClient {

    @GetMapping("/foreigncatalog/{id}")
    ProductDTO getProductById(@PathVariable("id") Long id);

    @PutMapping("/foreigncatalog/codigo/{codigo}/stock")
    void updateStock(
            @PathVariable String codigo,
            @RequestParam("cantidad") Integer cantidad
    );

    @GetMapping("/foreigncatalog/codigo/{codigo}")
    ProductDTO getProductByCodigo(@PathVariable String codigo);

}
