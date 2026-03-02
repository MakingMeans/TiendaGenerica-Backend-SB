package com.tienda.authenticationservice.service.impl;

import com.tienda.authenticationservice.dto.*;
import com.tienda.authenticationservice.entity.Usuario;
import com.tienda.authenticationservice.entity.Rol;
import com.tienda.authenticationservice.entity.UsuarioRol;
import com.tienda.authenticationservice.entity.UsuarioRolId;
import com.tienda.authenticationservice.repository.UsuarioRepository;
import com.tienda.authenticationservice.repository.RolRepository;
import com.tienda.authenticationservice.repository.UsuarioRolRepository;
import com.tienda.authenticationservice.service.JwtService;
import com.tienda.authenticationservice.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final UsuarioRepository repository;
    private final RolRepository rolRepository;
    private final UsuarioRolRepository usuarioRolRepository;
    private final PasswordEncoder encoder;
    private final JwtService jwtUtil;

    @Override
    public LoginResponseDTO login(LoginRequestDTO request) {

        Usuario usuario = repository
                .findByUsernameOrEmailUsuario(request.getUsername(), request.getUsername())
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        if (!encoder.matches(request.getPassword(), usuario.getPassword())) {
            throw new RuntimeException("Credenciales inválidas");
        }

        List<String> roles = usuario.getRoles()
                .stream()
                .map(r -> r.getRol().getNombre())
                .toList();

        String token = jwtUtil.generateToken(usuario.getUsername(), roles);

        return new LoginResponseDTO(token);
    }

    @Override
    public void register(RegisterUserDTO request) {

        // basic user object
        Usuario usuario = new Usuario();
        usuario.setUsername(request.getUsername());
        usuario.setPassword(encoder.encode(request.getPassword()));
        usuario.setActivo(true);

        // save user first to generate id
        usuario = repository.save(usuario);

        // ensure default role exists
        Rol cajero = rolRepository.findByNombre("CAJERO")
                .orElseGet(() -> {
                    Rol r = new Rol();
                    r.setNombre("CAJERO");
                    return rolRepository.save(r);
                });

        // link user and role
        UsuarioRol usuarioRol = new UsuarioRol();
        usuarioRol.setId(new UsuarioRolId(usuario.getIdUsuario(), cajero.getIdRol()));
        usuarioRol.setUsuario(usuario);
        usuarioRol.setRol(cajero);

        usuarioRolRepository.save(usuarioRol);
    }
}