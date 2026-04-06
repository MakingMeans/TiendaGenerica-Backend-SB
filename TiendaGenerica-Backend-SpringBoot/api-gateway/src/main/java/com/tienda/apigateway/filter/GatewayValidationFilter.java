package com.tienda.apigateway.filter;

import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.cloud.gateway.filter.GatewayFilterChain;
import org.springframework.cloud.gateway.filter.GlobalFilter;
import org.springframework.core.Ordered;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Mono;

@Component
public class GatewayValidationFilter implements GlobalFilter, Ordered {

    @Value("${security.jwt.secret}")
    private String secret;

    @Value("${gateway.secret}")
    private String gatewaySecret;

    private static final String AUTH_HEADER = "Authorization";
    private static final String GATEWAY_SECRET_HEADER = "X-Gateway-Secret";

    @Override
    public Mono<Void> filter(ServerWebExchange exchange, GatewayFilterChain chain) {
        String path = exchange.getRequest().getPath().value();

        // bypass validation for authentication endpoints
        if (path.startsWith("/auth/")) { // incluye login y signup
            return chain.filter(exchange);
        }

        // bypass validation for health endpoint
        if (path.equals("/health")) {
            exchange.getResponse().getHeaders().add("Content-Type", "application/json");
            String healthResponse = "{\"status\":\"UP\",\"timestamp\":" + System.currentTimeMillis() + "}";
            return exchange.getResponse().writeWith(Mono.just(exchange.getResponse().bufferFactory().wrap(healthResponse.getBytes())));
        }

        /*// allow swagger / openapi
        if (path.startsWith("/v3/api-docs") || path.startsWith("/swagger-ui") || path.startsWith("/swagger-ui.html")) {
            return chain.filter(exchange);
        }*/

        // Check if this is an internal service-to-service call
        String gatewaySecretHeader = exchange.getRequest().getHeaders().getFirst(GATEWAY_SECRET_HEADER);
        if (gatewaySecret.equals(gatewaySecretHeader)) {
            // Valid internal call - bypass JWT validation
            return chain.filter(exchange);
        }

        // External client - validate JWT token
        String header = exchange.getRequest().getHeaders().getFirst(AUTH_HEADER);
        if (header == null || !header.startsWith("Bearer ")) {
            exchange.getResponse().setStatusCode(HttpStatus.UNAUTHORIZED);
            return exchange.getResponse().setComplete();
        }

        String token = header.substring(7);
        try {
            Jwts.parser()
                    .setSigningKey(secret)
                    .parseClaimsJws(token);
            return chain.filter(exchange);
        } catch (JwtException e) {
            exchange.getResponse().setStatusCode(HttpStatus.UNAUTHORIZED);
            return exchange.getResponse().setComplete();
        }
    }

    @Override
    public int getOrder() {
        // execute after most built-in filters
        return Ordered.LOWEST_PRECEDENCE;
    }
}