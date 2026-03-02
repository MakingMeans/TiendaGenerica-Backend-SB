package com.tienda.authenticationservice.util;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

public class GenerateHash {
    public static void main(String[] args) {
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        String rawPassword = "admin123456";
        String hash = encoder.encode(rawPassword);
        System.out.println("BCrypt hash: " + hash);
    }
}