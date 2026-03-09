package com.tienda.buyservice.client;

import com.tienda.buyservice.config.FeignConfig;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(
        name = "api-gateway",
        configuration = FeignConfig.class
)
public interface SupplierClient {

    @GetMapping("/foreignsuppliers/{id}")
    Object getInternalById(@PathVariable("id") Long id);

}
