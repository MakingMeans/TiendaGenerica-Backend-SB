package com.tienda.supplierservice.service.impl;

import com.tienda.supplierservice.dto.*;
import com.tienda.supplierservice.entity.Proveedor;
import com.tienda.supplierservice.exception.ResourceNotFoundException;
import com.tienda.supplierservice.repository.ProveedorRepository;
import com.tienda.supplierservice.service.ProveedorService;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ProveedorServiceImpl implements ProveedorService {

    private final ProveedorRepository repository;

    @Override
    public List<ProveedorResponseDTO> findAll() {
        return repository.findAll()
                .stream()
                .map(this::map)
                .toList();
    }

    @Override
    public ProveedorResponseDTO findById(Long id) {
        return map(repository.findById(id).orElseThrow());
    }

    @Override
    public ProveedorResponseDTO findByNit(String nit) {
        return map(repository.findByNit(nit)
                .orElseThrow(() -> new ResourceNotFoundException("Supplier not found with NIT " + nit)));
    }

    @Override
    public void create(ProveedorRequestDTO dto) {

        if (repository.existsByNit(dto.getNit())) {
            throw new RuntimeException("Proveedor ya existe");
        }

        repository.save(toEntity(dto));
    }

    @Override
    public void update(Long id, ProveedorRequestDTO dto) {

        Proveedor p = repository.findById(id).orElseThrow();

        p.setNombre(dto.getNombre());
        p.setDireccion(dto.getDireccion());
        p.setTelefono(dto.getTelefono());
        p.setCiudad(dto.getCiudad());
        p.setEmail(dto.getEmail());
        p.setActivo(dto.getActivo());

        repository.save(p);
    }

    @Override
    public void delete(Long id) {
        repository.deleteById(id);
    }

    @Override
    public void deactivate(Long id) {

        Proveedor p = repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Supplier not found"));

        if(p.getActivo()){
            p.setActivo(false);
        }else{
            p.setActivo(true);
        }
        repository.save(p);
    }

    @Override
    public List<ProveedorNitNameDTO> findActiveNits() {
        return repository.findByActivoTrue()
                .stream()
                .map(p -> new ProveedorNitNameDTO(p.getIdProveedor(), p.getNit(), p.getNombre()))
                .toList();
    }

    private Proveedor toEntity(ProveedorRequestDTO d) {
        Proveedor p = new Proveedor();

        p.setNit(d.getNit());
        p.setNombre(d.getNombre());
        p.setDireccion(d.getDireccion());
        p.setTelefono(d.getTelefono());
        p.setCiudad(d.getCiudad());
        p.setEmail(d.getEmail());
        p.setActivo(d.getActivo());

        return p;
    }

    private ProveedorResponseDTO map(Proveedor p) {
        return new ProveedorResponseDTO(
                p.getIdProveedor(),
                p.getNit(),
                p.getNombre(),
                p.getDireccion(),
                p.getTelefono(),
                p.getCiudad(),
                p.getEmail(),
                p.getActivo()
        );
    }
}