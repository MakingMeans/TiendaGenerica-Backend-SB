package com.tienda.catalogservice.service.impl;

import com.tienda.catalogservice.dto.*;
import com.tienda.catalogservice.entity.Producto;
import com.tienda.catalogservice.exception.ResourceNotFoundException;
import com.tienda.catalogservice.repository.ProductoRepository;
import com.tienda.catalogservice.service.ProductoService;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ProductoServiceImpl implements ProductoService {

    private final ProductoRepository productoRepository;

    @Override
    public List<ProductoResponseDTO> findAll() {
        return productoRepository.findAll()
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
    @Transactional
    public void create(ProductoRequestDTO dto) {

        Producto p = new Producto();

        p.setCodigo(generarCodigo());
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
    }

    @Override
    public void delete(Long id) {
        productoRepository.deleteById(id);
    }

    @Override
    public void deactivate(Long id) {

        Producto producto = productoRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Producto no encontrado"));

        if(producto.getActivo()){
            producto.setActivo(false);
        }else{
            producto.setActivo(true);
        }
        productoRepository.save(producto);
    }

    @Override
    @Transactional
    public void incrementarStock(String codigoProducto, Integer cantidad) {

        Producto producto = productoRepository.findByCodigo(codigoProducto)
                .orElseThrow(() -> new RuntimeException("Producto no encontrado"));

        Integer stockActual = producto.getStockActual() == null ? 0 : producto.getStockActual();
        Integer stockMaximo = producto.getStockMaximo();

        int nuevoStock = stockActual + cantidad;

        if (stockMaximo != null && nuevoStock > stockMaximo) {
            throw new RuntimeException(
                    "Stock máximo excedido. Stock actual: " + stockActual +
                            ", máximo permitido: " + stockMaximo
            );
        }



        producto.setStockActual(nuevoStock);
        productoRepository.save(producto);
    }

    @Override
    @Transactional
    public void updateStock(String codigoProducto, Integer cantidad) {

        Producto producto = productoRepository.findByCodigo(codigoProducto)
                .orElseThrow(() -> new RuntimeException("Producto no encontrado"));

        if(producto.getStockActual() < cantidad){
            throw new RuntimeException("Stock insuficiente");
        }

        producto.setStockActual(producto.getStockActual() - cantidad);

        productoRepository.save(producto);
    }

    private String generarCodigo() {

        Long total = productoRepository.count() + 1;

        return String.format("PROD-%04d", total);
    }

    private ProductoResponseDTO map(Producto p) {

        return new ProductoResponseDTO(
                p.getIdProducto(),
                p.getCodigo(),
                p.getNombre(),
                p.getDescripcion(),
                p.getPrecioVenta(),
                p.getIva(),
                p.getStockActual(),
                p.getActivo()
        );
    }

    @Override
    public ProductoResponseDTO findByCodigo(String codigo) {
        Producto product = productoRepository.findByCodigo(codigo)
                .orElseThrow(() -> new RuntimeException("Producto no encontrado"));

        return map(product);
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

                if (parts.length < 7) {
                    throw new RuntimeException("CSV mal formado: " + line);
                }

                ProductoRequestDTO dto = new ProductoRequestDTO();

                dto.setNombre(parts[0].trim());
                dto.setDescripcion(parts[1].trim());
                dto.setPrecioVenta(new BigDecimal(parts[2].trim()));
                dto.setIva(new BigDecimal(parts[3].trim()));
                dto.setStockActual(Integer.parseInt(parts[4].trim()));
                dto.setStockMinimo(Integer.parseInt(parts[5].trim()));
                dto.setStockMaximo(Integer.parseInt(parts[6].trim()));

                create(dto);
            }

        } catch (IOException e) {
            throw new RuntimeException("Error leyendo CSV", e);
        }
    }
}