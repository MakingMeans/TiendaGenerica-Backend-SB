package com.tienda.buyservice.service.impl;

import com.tienda.buyservice.dto.*;
import com.tienda.buyservice.entity.*;
import com.tienda.buyservice.exception.ResourceNotFoundException;
import com.tienda.buyservice.repository.*;
import com.tienda.buyservice.service.BuyService;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class BuyServiceImpl implements BuyService {

    private final BuyRepository buyRepository;

    @Override
    public List<BuyDTO> findAll() {
        return buyRepository.findAll()
                .stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    @Override
    public BuyDTO findById(Long id) {
        Buy buy = buyRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Buy not found"));

        return toDTO(buy);
    }

    @Override
    public BuyDTO create(BuyDTO dto) {

        if (dto.getDetalles() == null || dto.getDetalles().isEmpty()) {
            throw new IllegalArgumentException("La compra debe tener al menos un detalle");
        }

        Buy buy = new Buy();
        buy.setNumeroCompra(dto.getNumeroCompra());
        buy.setIdProveedor(dto.getIdProveedor());
        buy.setEstado(dto.getEstado());

        List<BuyDetails> details = dto.getDetalles()
                .stream()
                .map(d -> {

                    BuyDetails detail = new BuyDetails();
                    detail.setCompra(buy);
                    detail.setIdProducto(d.getIdProducto());
                    detail.setCantidad(d.getCantidad());
                    detail.setPrecioUnitario(d.getPrecioUnitario());

                    BigDecimal total = d.getPrecioUnitario()
                            .multiply(BigDecimal.valueOf(d.getCantidad()));

                    detail.setTotal(total);

                    return detail;

                }).collect(Collectors.toList());


        buy.setDetalles(details);

        BigDecimal totalCompra = details.stream()
                .map(BuyDetails::getTotal)
                .reduce(BigDecimal.ZERO, BigDecimal::add);
        buy.setTotal(totalCompra);

        Buy saved = buyRepository.save(buy);

        return toDTO(saved);
    }

    @Override
    public void delete(Long id) {
        buyRepository.deleteById(id);
    }

    private BuyDTO toDTO(Buy compra) {

        List<BuyDetailsDTO> detalles = compra.getDetalles()
                .stream()
                .map(d -> new BuyDetailsDTO(
                        d.getIdProducto(),
                        d.getCantidad(),
                        d.getPrecioUnitario(),
                        d.getTotal()
                )).toList();

        return BuyDTO.builder()
                .idCompra(compra.getIdCompra())
                .numeroCompra(compra.getNumeroCompra())
                .idProveedor(compra.getIdProveedor())
                .fecha(compra.getFecha())
                .total(compra.getTotal())
                .estado(compra.getEstado())
                .detalles(detalles)
                .build();
    }
}
