package com.tienda.authenticationservice.config;

import org.springframework.context.annotation.*;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfigurationSource;

import com.tienda.authenticationservice.security.JwtAuthenticationFilter;

/**
 * Spring Security configuration for authentication service.
 * Enables JWT-based authentication and CORS support.
 */
@Configuration
@EnableMethodSecurity
public class SecurityConfig {

    private final JwtAuthenticationFilter jwtFilter;
    private final CorsConfigurationSource corsConfigurationSource;

    public SecurityConfig(JwtAuthenticationFilter jwtFilter, 
                        CorsConfigurationSource corsConfigurationSource) {
        this.jwtFilter = jwtFilter;
        this.corsConfigurationSource = corsConfigurationSource;
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

        http
            // Enable CORS
            .cors(cors -> cors.disable())
            
            // Disable CSRF (JWT handles security)
            .csrf(csrf -> csrf.disable())
            
            // Configure security rules
            .authorizeHttpRequests(auth -> auth
                // Swagger/API docs endpoints - public
                .requestMatchers(
                    "/v3/api-docs/**",
                    "/swagger-ui/**",
                    "/swagger-ui.html",
                    "/swagger-resources/**",
                    "/webjars/**"
                ).permitAll()
                
                // Public authentication endpoints
                .requestMatchers(
                    "/auth/login",
                    "/auth/signup",
                    "/auth/register",
                    "/auth/validate",
                    "/auth/refresh",
                    "/auth/verify",
                    "/admin/login"
                ).permitAll()
                
                // All other requests require authentication
                .anyRequest().authenticated()
            )
            
            // Add JWT filter before username/password filter
            .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }
}