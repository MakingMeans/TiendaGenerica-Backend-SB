package com.tienda.apigateway.filter;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.cloud.gateway.filter.GlobalFilter;
import org.springframework.stereotype.Component;
import reactor.core.publisher.Mono;

@Component
public class GatewaySecretFilter implements GlobalFilter {

    @Value("${gateway.secret}")
    private String gatewaySecret;

    @Override
    public Mono filter(org.springframework.web.server.ServerWebExchange exchange,
                       org.springframework.cloud.gateway.filter.GatewayFilterChain chain) {

        return chain.filter(
                exchange.mutate()
                        .request(r -> r.header("X-Gateway-Secret", gatewaySecret))
                        .build()
        );
    }
}