package com.tienda.authenticationservice.service.impl;

import com.tienda.authenticationservice.dto.*;
import com.tienda.authenticationservice.entity.Usuario;
import com.tienda.authenticationservice.entity.Rol;
import com.tienda.authenticationservice.entity.UsuarioRol;
import com.tienda.authenticationservice.entity.UsuarioRolId;
import com.tienda.authenticationservice.exception.ResourceAlreadyExistsException;
import com.tienda.authenticationservice.exception.InvalidCredentialsException;
import com.tienda.authenticationservice.repository.UsuarioRepository;
import com.tienda.authenticationservice.repository.RolRepository;
import com.tienda.authenticationservice.repository.UsuarioRolRepository;
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

    private final UsuarioRepository repository;
    private final RolRepository rolRepository;
    private final UsuarioRolRepository usuarioRolRepository;
    private final PasswordEncoder encoder;
    private final JwtService jwtUtil;

    @Override
    public LoginResponseDTO login(LoginRequestDTO request) {

        Usuario usuario = repository
                .findByUsernameOrEmailUsuario(request.getUsername(), request.getUsername())
                .orElseThrow(() -> new InvalidCredentialsException("Usuario o contraseña incorrecta"));

        if (!encoder.matches(request.getPassword(), usuario.getPassword())) {
            throw new InvalidCredentialsException("Usuario o contraseña incorrecta");
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

        if (repository.existsByUsername(request.getUsername())) {
            throw new ResourceAlreadyExistsException("Username ya existe");
        }

        if (repository.existsByCedula(request.getCedula())) {
            throw new ResourceAlreadyExistsException("Cédula ya existe");
        }

        if (repository.existsByEmailUsuario(request.getEmailUsuario())) {
            throw new ResourceAlreadyExistsException("Correo ya existe");
        }
        
        Usuario usuario = new Usuario();
        usuario.setCedula(request.getCedula());
        usuario.setNombre(request.getNombre());
        usuario.setApellido(request.getApellido());
        usuario.setEmailUsuario(request.getEmailUsuario());
        usuario.setUsername(request.getUsername());
        usuario.setPassword(encoder.encode(request.getPassword()));
        usuario.setActivo(true);
        usuario.setFechaCreacion(LocalDateTime.now());

        usuario = repository.save(usuario);

        Rol basic = rolRepository.findByNombre("USER")
                .orElseGet(() -> {
                    Rol r = new Rol();
                    r.setNombre("USER");
                    return rolRepository.save(r);
                });

        UsuarioRol usuarioRol = new UsuarioRol();
        usuarioRol.setId(new UsuarioRolId(usuario.getIdUsuario(), basic.getIdRol()));
        usuarioRol.setUsuario(usuario);
        usuarioRol.setRol(basic);

        usuarioRolRepository.save(usuarioRol);
    }

    @Override
    public List<String> getUserRoles(String usernameOrEmail) {
        Usuario usuario = repository
                .findByUsernameOrEmailUsuario(usernameOrEmail, usernameOrEmail)
                .orElseThrow(() -> new InvalidCredentialsException("Usuario no encontrado"));

        return usuario.getRoles()
                .stream()
                .map(r -> r.getRol().getNombre())
                .toList();
    }
}