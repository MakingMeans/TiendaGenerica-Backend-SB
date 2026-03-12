package com.tienda.saleservice.client;

import com.tienda.saleservice.config.FeignConfig;
import com.tienda.saleservice.dto.ClientDTO;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestParam;

@FeignClient(
        name = "api-gateway",
        configuration = FeignConfig.class,
        contextId = "customerClient"
)
public interface CustomerClient {

    @GetMapping("/foreignclient/{id}")
    ClientDTO getClientById(@PathVariable("id") Long id);
}
