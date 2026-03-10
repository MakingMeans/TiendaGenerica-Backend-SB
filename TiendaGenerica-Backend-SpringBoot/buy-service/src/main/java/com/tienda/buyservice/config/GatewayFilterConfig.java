package com.tienda.buyservice.config;

import com.tienda.buyservice.security.GatewayValidationFilter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class GatewayFilterConfig {

    @Value("${gateway.secret}")
    private String gatewaySecret;

    @Bean
    public FilterRegistrationBean<GatewayValidationFilter> gatewayFilter() {

        FilterRegistrationBean<GatewayValidationFilter> bean =
                new FilterRegistrationBean<>();

        bean.setFilter(new GatewayValidationFilter(gatewaySecret));
        bean.addUrlPatterns("/*");

        return bean;
    }
}