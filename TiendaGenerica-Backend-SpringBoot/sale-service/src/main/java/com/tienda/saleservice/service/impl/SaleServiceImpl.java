package com.tienda.saleservice.service.impl;

import com.tienda.saleservice.client.CatalogClient;
import com.tienda.saleservice.client.CustomerClient;
import com.tienda.saleservice.dto.*;
import com.tienda.saleservice.entity.Payment;
import com.tienda.saleservice.entity.Sale;
import com.tienda.saleservice.entity.SaleDetail;
import com.tienda.saleservice.exception.ResourceNotFoundException;
import com.tienda.saleservice.repository.PaymentRepository;
import com.tienda.saleservice.repository.SaleDetailRepository;
import com.tienda.saleservice.repository.SaleRepository;
import com.tienda.saleservice.service.SaleService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class SaleServiceImpl implements SaleService {

    private final SaleRepository saleRepository;
    private final SaleDetailRepository saleDetailRepository;
    private final PaymentRepository paymentRepository;
    private final CatalogClient catalogClient;
    private final CustomerClient customerClient;



    @Override
    @Transactional
    public SaleDTO createSale(SaleDTO saleDTO) {

        try {
            customerClient.getClientById(saleDTO.getIdCliente());
        } catch (feign.FeignException.NotFound e) {
            throw new RuntimeException(
                    "Customer not found: " + saleDTO.getIdCliente()
            );
        }

        BigDecimal totalBruto = BigDecimal.ZERO;
        List<SaleDetail> detalles = new ArrayList<>();


        for (SaleDetailDTO detailDTO : saleDTO.getDetalles()) {

            ProductDTO product = catalogClient.getProductById(detailDTO.getIdProducto());

            if (product == null) {
                throw new RuntimeException("Producto no existe");
            }

            if (product.getStockActual() < detailDTO.getCantidad()) {
                throw new RuntimeException("Stock insuficiente para producto: " + product.getNombre());
            }

            BigDecimal precioUnitario = product.getPrecioVenta();

            BigDecimal total = precioUnitario.multiply(
                    BigDecimal.valueOf(detailDTO.getCantidad())
            );

            totalBruto = totalBruto.add(total);

            SaleDetail detail = new SaleDetail();
            detail.setIdProducto(detailDTO.getIdProducto());
            detail.setCantidad(detailDTO.getCantidad());
            detail.setPrecioUnitario(precioUnitario);
            detail.setTotal(total);

            detalles.add(detail);


            detailDTO.setPrecioUnitario(precioUnitario);
            detailDTO.setTotal(total);
        }


        BigDecimal totalIva = totalBruto.multiply(new BigDecimal("0.19"));
        BigDecimal totalFinal = totalBruto.add(totalIva);


        Sale sale = new Sale();

        sale.setNumeroVenta(generateSaleNumber());
        sale.setIdCliente(saleDTO.getIdCliente());
        sale.setIdUsuario(saleDTO.getIdUsuario());
        sale.setEstado("COMPLETADA");
        sale.setTotalBruto(totalBruto);
        sale.setTotalIva(totalIva);
        sale.setTotalFinal(totalFinal);

        sale = saleRepository.save(sale);


        for (SaleDetail detail : detalles) {

            detail.setIdVenta(sale.getIdVenta());

            saleDetailRepository.save(detail);


            catalogClient.updateStock(
                    detail.getIdProducto(),
                    Integer.valueOf("-"+detail.getCantidad())
            );
        }


        if (saleDTO.getPagos() != null) {

            for (PaymentDTO paymentDTO : saleDTO.getPagos()) {

                Payment payment = new Payment();

                payment.setIdVenta(sale.getIdVenta());
                payment.setIdMetodo(paymentDTO.getIdMetodo());
                payment.setMonto(totalFinal);

                paymentRepository.save(payment);
            }
        }


        saleDTO.setIdVenta(sale.getIdVenta());
        saleDTO.setNumeroVenta(sale.getNumeroVenta());
        saleDTO.setTotalBruto(totalBruto);
        saleDTO.setTotalIva(totalIva);
        saleDTO.setTotalFinal(totalFinal);

        return saleDTO;
    }

    @Override
    @Transactional
    public void deleteSale(Long id) {

        Sale sale = saleRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Venta no encontrada"));

        paymentRepository.deleteByIdVenta(id);

        saleDetailRepository.deleteByIdVenta(id);

        saleRepository.delete(sale);
    }

    @Override
    public List<SaleDTO> getAllSales() {

        List<Sale> sales = saleRepository.findAll();
        List<SaleDTO> result = new ArrayList<>();

        for (Sale sale : sales) {

            SaleDTO dto = new SaleDTO();

            dto.setIdVenta(sale.getIdVenta());
            dto.setNumeroVenta(sale.getNumeroVenta());
            dto.setIdCliente(sale.getIdCliente());
            dto.setIdUsuario(sale.getIdUsuario());
            dto.setFecha(sale.getFecha());
            dto.setTotalBruto(sale.getTotalBruto());
            dto.setTotalIva(sale.getTotalIva());
            dto.setTotalFinal(sale.getTotalFinal());
            dto.setEstado(sale.getEstado());

            List<SaleDetail> detalles = saleDetailRepository.findByIdVenta(sale.getIdVenta());

            List<SaleDetailDTO> detallesDTO = new ArrayList<>();

            for (SaleDetail d : detalles) {

                SaleDetailDTO detailDTO = new SaleDetailDTO();

                detailDTO.setIdProducto(d.getIdProducto());
                detailDTO.setCantidad(d.getCantidad());
                detailDTO.setPrecioUnitario(d.getPrecioUnitario());
                detailDTO.setTotal(d.getTotal());

                detallesDTO.add(detailDTO);
            }

            dto.setDetalles(detallesDTO);

            List<Payment> pagos = paymentRepository.findByIdVenta(sale.getIdVenta());

            List<PaymentDTO> pagosDTO = new ArrayList<>();

            for (Payment p : pagos) {

                PaymentDTO paymentDTO = new PaymentDTO();

                paymentDTO.setIdMetodo(p.getIdMetodo());
                paymentDTO.setMonto(p.getMonto());

                pagosDTO.add(paymentDTO);
            }

            dto.setPagos(pagosDTO);

            result.add(dto);
        }

        return result;
    }

    @Override
    public SaleDTO getSaleById(Long id) {

        Sale sale = saleRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Venta no encontrada"));

        List<SaleDetail> detalles = saleDetailRepository.findByIdVenta(sale.getIdVenta());

        List<Payment> pagos = paymentRepository.findByIdVenta(sale.getIdVenta());

        SaleDTO dto = new SaleDTO();

        dto.setIdVenta(sale.getIdVenta());
        dto.setNumeroVenta(sale.getNumeroVenta());
        dto.setIdCliente(sale.getIdCliente());
        dto.setIdUsuario(sale.getIdUsuario());
        dto.setFecha(sale.getFecha());
        dto.setTotalBruto(sale.getTotalBruto());
        dto.setTotalIva(sale.getTotalIva());
        dto.setTotalFinal(sale.getTotalFinal());
        dto.setEstado(sale.getEstado());

        List<SaleDetailDTO> detallesDTO = detalles.stream().map(det -> {
            SaleDetailDTO d = new SaleDetailDTO();
            d.setIdProducto(det.getIdProducto());
            d.setCantidad(det.getCantidad());
            d.setPrecioUnitario(det.getPrecioUnitario());
            d.setTotal(det.getTotal());
            return d;
        }).toList();

        dto.setDetalles(detallesDTO);

        List<PaymentDTO> pagosDTO = pagos.stream().map(p -> {
            PaymentDTO pago = new PaymentDTO();
            pago.setIdMetodo(p.getIdMetodo());
            pago.setMonto(p.getMonto());
            return pago;
        }).toList();

        dto.setPagos(pagosDTO);

        return dto;
    }


    private String generateSaleNumber() {

        Optional<Sale> lastSale = saleRepository.findTopByOrderByIdVentaDesc();

        int nextNumber = 1;

        if (lastSale.isPresent()) {

            String lastNumero = lastSale.get().getNumeroVenta();

            String numberPart = lastNumero.substring(5);

            nextNumber = Integer.parseInt(numberPart) + 1;
        }

        return String.format("COMP-%06d", nextNumber);
    }

}
