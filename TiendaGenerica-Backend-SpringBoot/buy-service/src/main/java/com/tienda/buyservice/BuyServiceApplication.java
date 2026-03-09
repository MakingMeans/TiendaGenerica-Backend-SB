package com.tienda.buyservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;

@EnableFeignClients
@SpringBootApplication
public class BuyServiceApplication {

    public static void main(String[] args) {
        SpringApplication.run(BuyServiceApplication.class, args);
    }
}
