package com.tienda.authenticationservice.service.impl;

import com.tienda.authenticationservice.dto.*;
import com.tienda.authenticationservice.entity.*;
import com.tienda.authenticationservice.repository.*;
import com.tienda.authenticationservice.service.UserService;

import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository usuarioRepository;
    private final RoleRepository rolRepository;
    private final UserRoleRepository usuarioRolRepository;
    private final PasswordEncoder encoder;

    @Override
    public List<UserResponseDTO> findAll() {
        return usuarioRepository.findAll()
                .stream()
                .map(this::map)
                .toList();
    }

    @Override
    public UserResponseDTO findById(Long id) {
        return map(usuarioRepository.findById(id).orElseThrow());
    }

    /*@Override
    public void create(RegisterUserDTO dto) {

        User u = new User();
        u.setCedula(dto.getCedula());
        u.setNombre(dto.getNombre());
        u.setApellido(dto.getApellido());
        u.setCorreo(dto.getCorreo());
        u.setUsername(dto.getUsername());
        u.setPassword(encoder.encode(dto.getPassword()));
        u.setActivo(true);
        u.setFechaCreacion(LocalDateTime.now());

        User savedUser = usuarioRepository.save(u);

        Role defaultRole = rolRepository
                .findByNombre("ROLE_USER")
                .orElseThrow();

        UserRole ur = new UserRole();
        ur.setId(new UserRoleId(savedUser.getIdUsuario(), defaultRole.getIdRol()));
        ur.setUsuario(savedUser);
        ur.setRol(defaultRole);

        usuarioRolRepository.save(ur);
    }*/

    @Override
    public void create(RegisterUserDTO dto) {

        User u = new User();
        u.setCedula(dto.getCedula());
        u.setNombre(dto.getNombre());
        u.setApellido(dto.getApellido());
        u.setCorreo(dto.getCorreo());
        u.setUsername(dto.getUsername());
        u.setPassword(encoder.encode(dto.getPassword()));
        u.setActivo(true);
        u.setFechaCreacion(LocalDateTime.now());

        User savedUser = usuarioRepository.save(u);

        List<String> requestedRoles = dto.getRoles();

        List<Role> rolesToAssign;

        // si vienen roles hay que filtrar validos
        if (requestedRoles != null && !requestedRoles.isEmpty()) {

            rolesToAssign = requestedRoles.stream()
                    .map(r -> rolRepository.findByNombre(r).orElse(null))
                    .filter(r -> r != null)
                    .toList();

            // si ninguno fue válido poner default ROLE_USER
            if (rolesToAssign.isEmpty()) {
                rolesToAssign = List.of(
                        rolRepository.findByNombre("ROLE_USER").orElseThrow()
                );
            }

        } else {
            // default directo
            rolesToAssign = List.of(
                    rolRepository.findByNombre("ROLE_USER").orElseThrow()
            );
        }

        // guardar relaciones
        for (Role rol : rolesToAssign) {

            UserRole ur = new UserRole();
            ur.setId(new UserRoleId(savedUser.getIdUsuario(), rol.getIdRol()));
            ur.setUsuario(savedUser);
            ur.setRol(rol);

            usuarioRolRepository.save(ur);
        }
    }

    @Override
    public void update(Long id, UpdateUserDTO dto) {

        User u = usuarioRepository.findById(id).orElseThrow();

        u.setNombre(dto.getNombre());
        u.setApellido(dto.getApellido());
        u.setCorreo(dto.getCorreo());
        u.setActivo(dto.getActivo());

        usuarioRepository.save(u);
    }

    @Override
    public void delete(Long id) {
        usuarioRepository.deleteById(id);
    }

    @Override
    public void updateRoles(Long id, List<String> roles) {

        User usuario = usuarioRepository.findById(id).orElseThrow();

        usuarioRolRepository.deleteAll(usuario.getRoles());

        for (String r : roles) {

            Role rol = rolRepository.findByNombre(r).orElseThrow();

            UserRole ur = new UserRole();
            ur.setId(new UserRoleId(usuario.getIdUsuario(), rol.getIdRol()));
            ur.setUsuario(usuario);
            ur.setRol(rol);

            usuarioRolRepository.save(ur);
        }
    }

    @Override
    public void updateCredentials(Long id, UpdateCredentialsDTO dto) {

        User u = usuarioRepository.findById(id).orElseThrow();

        // username
        if (dto.getUsername() != null) {
            if (usuarioRepository.existsByUsername(dto.getUsername())) {
                throw new RuntimeException("Username ya existe");
            }
            u.setUsername(dto.getUsername());
        }

        // password
        if (dto.getPassword() != null) {
            u.setPassword(encoder.encode(dto.getPassword()));
        }

        usuarioRepository.save(u);
    }

    private UserResponseDTO map(User u) {

        List<String> roles = u.getRoles()
                .stream()
                .map(r -> r.getRol().getNombre())
                .toList();

        return new UserResponseDTO(
                u.getIdUsuario(),
                u.getCedula(),
                u.getNombre(),
                u.getApellido(),
                u.getCorreo(),
                u.getUsername(),
                u.getActivo(),
                roles
        );
    }
}