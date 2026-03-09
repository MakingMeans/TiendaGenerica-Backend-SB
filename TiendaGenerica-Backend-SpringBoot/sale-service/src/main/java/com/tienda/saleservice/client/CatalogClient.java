package com.tienda.saleservice.client;

import com.tienda.saleservice.config.FeignConfig;
import com.tienda.saleservice.dto.ProductDTO;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.*;

@FeignClient(
        name = "api-gateway",
        configuration = FeignConfig.class
)
public interface CatalogClient {

    @GetMapping("/foreigncatalog/{id}")
    ProductDTO getProductById(@PathVariable("id") Long id);

}
