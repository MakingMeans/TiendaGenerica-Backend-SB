package com.tienda.catalogservice.service.impl;

import com.tienda.catalogservice.dto.*;
import com.tienda.catalogservice.entity.*;
import com.tienda.catalogservice.exception.ResourceNotFoundException;
import com.tienda.catalogservice.repository.*;
import com.tienda.catalogservice.service.ProductoService;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ProductoServiceImpl implements ProductoService {

    private final ProductoRepository productoRepository;
    private final ProductoProveedorRepository productoProveedorRepository;

    @Override
    public List<ProductoResponseDTO> findAll() {
        return productoRepository.findAllWithProveedores()
                .stream()
                .map(this::map)
                .toList();
    }

    @Override
    public ProductoResponseDTO findById(Long id) {
        return map(productoRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Producto no encontrado")));
    }

    @Override
    public void create(ProductoRequestDTO dto) {

        if (productoRepository.findByCodigo(dto.getCodigo()).isPresent()) {
            throw new RuntimeException("Producto con código ya existe");
        }

        Producto p = new Producto();

        p.setCodigo(dto.getCodigo());
        p.setNombre(dto.getNombre());
        p.setDescripcion(dto.getDescripcion());
        p.setPrecioVenta(dto.getPrecioVenta());
        p.setIva(dto.getIva());

        p.setStockActual(dto.getStockActual() != null ? dto.getStockActual() : 0);
        p.setStockMinimo(dto.getStockMinimo() != null ? dto.getStockMinimo() : 0);
        p.setStockMaximo(dto.getStockMaximo() != null ? dto.getStockMaximo() : 0);

        p.setActivo(true);
        p.setFechaCreacion(LocalDateTime.now());

        productoRepository.save(p);

        if (dto.getProveedores() != null && !dto.getProveedores().isEmpty()) {
            for (ProductoProveedorRequestDTO prov : dto.getProveedores()) {
                ProductoProveedor pp = new ProductoProveedor();
                pp.setIdProducto(p.getIdProducto());
                pp.setNitProveedor(prov.getNit());
                pp.setPrecioCompra(prov.getPrecioCompra());
                productoProveedorRepository.save(pp);
            }
        }
    }

    @Override
    public void update(Long id, ProductoRequestDTO dto) {

        Producto p = productoRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Producto no encontrado"));

        p.setNombre(dto.getNombre());
        p.setDescripcion(dto.getDescripcion());
        p.setPrecioVenta(dto.getPrecioVenta());
        p.setIva(dto.getIva());

        p.setStockActual(dto.getStockActual());
        p.setStockMinimo(dto.getStockMinimo());
        p.setStockMaximo(dto.getStockMaximo());

        productoRepository.save(p);

        if (dto.getProveedores() != null) {
            // eliminar relaciones anteriores
            productoProveedorRepository.deleteByIdProducto(id);
            for (ProductoProveedorRequestDTO prov : dto.getProveedores()) {
                ProductoProveedor pp = new ProductoProveedor();
                pp.setIdProducto(id);
                pp.setNitProveedor(prov.getNit());
                pp.setPrecioCompra(prov.getPrecioCompra());
                productoProveedorRepository.save(pp);
            }
        }
    }

    @Override
    public void delete(Long id) {

        Producto producto = productoRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Producto no encontrado"));

        // eliminar relaciones primero
        productoProveedorRepository.deleteByIdProducto(id);

        // eliminar producto
        productoRepository.delete(producto);
    }

    private ProductoResponseDTO map(Producto p) {

        List<ProductoProveedorDTO> proveedores =
                p.getProductoProveedores()
                        .stream()
                        .map(pp -> {

                            ProductoProveedorDTO dto = new ProductoProveedorDTO();

                            dto.setNit(pp.getNitProveedor());
                            dto.setPrecioCompra(pp.getPrecioCompra());

                            return dto;
                        })
                        .toList();

        return new ProductoResponseDTO(
                p.getIdProducto(),
                p.getCodigo(),
                p.getNombre(),
                p.getDescripcion(),
                p.getPrecioVenta(),
                p.getIva(),
                p.getStockActual(),
                p.getActivo(),
                proveedores
        );
    }

    @Override
    public void uploadCsv(MultipartFile file) {

        if (file == null || file.isEmpty()) {
            throw new RuntimeException("CSV vacío");
        }

        try (BufferedReader reader = new BufferedReader(new InputStreamReader(file.getInputStream()))) {

            String line;
            boolean first = true;

            while ((line = reader.readLine()) != null) {

                if (first) {
                    first = false;
                    continue;
                }

                if (line.trim().isEmpty()) continue;

                String[] parts = line.split(",");

                if (parts.length < 10) {
                    throw new RuntimeException("CSV mal formado: " + line);
                }

                String codigo = parts[0].trim();

                if (productoRepository.findByCodigo(codigo).isPresent()) {
                    continue;
                }

                ProductoRequestDTO dto = new ProductoRequestDTO();

                dto.setCodigo(codigo);
                dto.setNombre(parts[1].trim());
                dto.setDescripcion(parts[2].trim());
                dto.setPrecioVenta(new BigDecimal(parts[3].trim()));
                dto.setIva(new BigDecimal(parts[4].trim()));
                dto.setStockActual(Integer.parseInt(parts[5].trim()));
                dto.setStockMinimo(Integer.parseInt(parts[6].trim()));
                dto.setStockMaximo(Integer.parseInt(parts[7].trim()));

                // crear proveedor del CSV
                ProductoProveedorRequestDTO proveedor = new ProductoProveedorRequestDTO();

                proveedor.setNit(parts[8].trim());
                proveedor.setPrecioCompra(new BigDecimal(parts[9].trim()));

                List<ProductoProveedorRequestDTO> proveedores = new ArrayList<>();
                proveedores.add(proveedor);

                dto.setProveedores(proveedores);

                create(dto);
            }

        } catch (IOException e) {
            throw new RuntimeException("Error leyendo CSV", e);
        }
    }
}