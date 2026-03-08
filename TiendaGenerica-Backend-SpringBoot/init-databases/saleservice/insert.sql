SET NAMES utf8mb4;

INSERT INTO ventas (numero_venta,id_cliente,id_usuario,total_bruto,total_iva,total_final,estado)
VALUES ('VEN-001',1,1,30000,5700,35700,'PAGADA');

INSERT INTO detalle_ventas (id_venta,id_producto,cantidad,precio_unitario,total)
VALUES (1,1,1,30351,30351);

INSERT INTO metodos_pago (nombre) VALUES
('EFECTIVO'),('TARJETA'),('TRANSFERENCIA');

INSERT INTO pagos (id_venta,id_metodo,monto)
VALUES (1,1,35700);