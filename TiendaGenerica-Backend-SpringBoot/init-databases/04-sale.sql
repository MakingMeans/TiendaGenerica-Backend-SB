CREATE DATABASE IF NOT EXISTS saleservice;
USE saleservice;

-- create.sql
CREATE TABLE ventas (
    id_venta BIGINT AUTO_INCREMENT PRIMARY KEY,
    numero_venta VARCHAR(50) NOT NULL UNIQUE,
    id_cliente BIGINT NOT NULL,
    id_usuario BIGINT NOT NULL,
    fecha DATETIME DEFAULT CURRENT_TIMESTAMP,
    total_bruto DECIMAL(14,2),
    total_iva DECIMAL(14,2),
    total_final DECIMAL(14,2),
    estado VARCHAR(50)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE detalle_ventas (
    id_detalle_venta BIGINT AUTO_INCREMENT PRIMARY KEY,
    id_venta BIGINT NOT NULL,
    codigo_producto VARCHAR(15) NOT NULL,
    cantidad INT NOT NULL,
    precio_unitario DECIMAL(12,2) NOT NULL,
    total DECIMAL(14,2),
    FOREIGN KEY (id_venta) REFERENCES ventas(id_venta)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE metodos_pago (
    id_metodo BIGINT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL UNIQUE,
    activo BOOLEAN DEFAULT TRUE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE pagos (
    id_pago BIGINT AUTO_INCREMENT PRIMARY KEY,
    id_venta BIGINT NOT NULL,
    id_metodo BIGINT NOT NULL,
    monto DECIMAL(14,2),
    fecha DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_venta) REFERENCES ventas(id_venta),
    FOREIGN KEY (id_metodo) REFERENCES metodos_pago(id_metodo)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- insert.sql
SET NAMES utf8mb4;

INSERT INTO ventas (numero_venta,id_cliente,id_usuario,total_bruto,total_iva,total_final,estado)
VALUES ('VEN-001',1,1,30000,5700,35700,'PAGADA');

INSERT INTO detalle_ventas (id_venta,codigo_producto,cantidad,precio_unitario,total)
VALUES (1,"PROD-0001",1,30351,30351);

INSERT INTO metodos_pago (nombre) VALUES
('EFECTIVO'),('TARJETA'),('TRANSFERENCIA');

INSERT INTO pagos (id_venta,id_metodo,monto)
VALUES (1,1,35700);