package com.tienda.buyservice.security;

import jakarta.servlet.*;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;

public class GatewayValidationFilter implements Filter {

    private final String gatewaySecret;

    public GatewayValidationFilter(String gatewaySecret) {
        this.gatewaySecret = gatewaySecret;
    }

    @Override
    public void doFilter(ServletRequest request,
                         ServletResponse response,
                         FilterChain chain)
            throws IOException, ServletException {

        HttpServletRequest httpRequest = (HttpServletRequest) request;
        HttpServletResponse httpResponse = (HttpServletResponse) response;

        String gatewayHeader = httpRequest.getHeader("X-Gateway-Secret");

        if (gatewayHeader == null) {
            gatewayHeader = httpRequest.getHeader("x-gateway-secret");
        }

        if (!gatewaySecret.equals(gatewayHeader)) {

            httpResponse.setStatus(HttpServletResponse.SC_FORBIDDEN);
            httpResponse.setContentType("application/json");

            httpResponse.getWriter().write("""
                {"error":"Direct access not allowed. Use API Gateway.","status":403}
            """);

            return;
        }

        chain.doFilter(request, response);
    }
}