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

    @PutMapping("/foreigncatalog/{id}/stock")
    void updateStock(
            @PathVariable("id") Long id,
            @RequestParam("cantidad") Integer cantidad
    );

}
