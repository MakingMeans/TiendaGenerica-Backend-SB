package com.tienda.authenticationservice.service.impl;

import com.tienda.authenticationservice.dto.*;
import com.tienda.authenticationservice.entity.User;
import com.tienda.authenticationservice.entity.Role;
import com.tienda.authenticationservice.entity.UserRole;
import com.tienda.authenticationservice.entity.UserRoleId;
import com.tienda.authenticationservice.exception.ResourceAlreadyExistsException;
import com.tienda.authenticationservice.exception.InvalidCredentialsException;
import com.tienda.authenticationservice.repository.UserRepository;
import com.tienda.authenticationservice.repository.RoleRepository;
import com.tienda.authenticationservice.repository.UserRoleRepository;
import com.tienda.authenticationservice.security.JwtService;
import com.tienda.authenticationservice.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final UserRepository repository;
    private final RoleRepository rolRepository;
    private final UserRoleRepository usuarioRolRepository;
    private final PasswordEncoder encoder;
    private final JwtService jwtUtil;

    @Override
    public LoginResponseDTO login(LoginRequestDTO request) {

        User usuario = repository
                .findByUsernameOrCorreo(request.getUsername(), request.getUsername())
                .orElseThrow(() -> new InvalidCredentialsException("Usuario o contraseña incorrecta"));

        if (!encoder.matches(request.getPassword(), usuario.getPassword())) {
            throw new InvalidCredentialsException("Usuario o contraseña incorrecta");
        }

        List<String> roles = usuario.getRoles()
                .stream()
                .map(r -> r.getRol().getNombre())
                .toList();

        String token = jwtUtil.generateToken(usuario.getIdUsuario(), usuario.getUsername(), roles);

        return new LoginResponseDTO(token);
    }

    @Override
    public void register(RegisterUserDTO request) {

        if (repository.existsByUsername(request.getUsername())) {
            throw new ResourceAlreadyExistsException("Username ya existe");
        }

        if (repository.existsByCedula(request.getCedula())) {
            throw new ResourceAlreadyExistsException("Cédula ya existe");
        }

        if (repository.existsByCorreo(request.getCorreo())) {
            throw new ResourceAlreadyExistsException("Correo ya existe");
        }
        
        User usuario = new User();
        usuario.setCedula(request.getCedula());
        usuario.setNombre(request.getNombre());
        usuario.setApellido(request.getApellido());
        usuario.setCorreo(request.getCorreo());
        usuario.setUsername(request.getUsername());
        usuario.setPassword(encoder.encode(request.getPassword()));
        usuario.setActivo(true);
        usuario.setFechaCreacion(LocalDateTime.now());

        usuario = repository.save(usuario);

        Role basic = rolRepository.findByNombre("ROLE_USER")
                .orElseGet(() -> {
                    Role r = new Role();
                    r.setNombre("ROLE_USER");
                    return rolRepository.save(r);
                });

        UserRole usuarioRol = new UserRole();
        usuarioRol.setId(new UserRoleId(usuario.getIdUsuario(), basic.getIdRol()));
        usuarioRol.setUsuario(usuario);
        usuarioRol.setRol(basic);

        usuarioRolRepository.save(usuarioRol);
    }

    @Override
    public List<String> getUserRoles(String usernameOrEmail) {
        User usuario = repository
                .findByUsernameOrCorreo(usernameOrEmail, usernameOrEmail)
                .orElseThrow(() -> new InvalidCredentialsException("Usuario no encontrado"));

        return usuario.getRoles()
                .stream()
                .map(r -> r.getRol().getNombre())
                .toList();
    }
}