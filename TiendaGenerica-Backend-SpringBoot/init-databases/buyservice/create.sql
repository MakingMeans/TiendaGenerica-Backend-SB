CREATE TABLE compras (
    id_compra BIGINT AUTO_INCREMENT PRIMARY KEY,
    numero_compra VARCHAR(50) NOT NULL UNIQUE,
    id_proveedor BIGINT NOT NULL,
    fecha DATETIME DEFAULT CURRENT_TIMESTAMP,
    total DECIMAL(14,2),
    estado VARCHAR(50)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE detalle_compras (
    id_detalle_compra BIGINT AUTO_INCREMENT PRIMARY KEY,
    id_compra BIGINT NOT NULL,
    id_producto BIGINT NOT NULL,
    cantidad INT NOT NULL,
    precio_unitario DECIMAL(12,2) NOT NULL,
    total DECIMAL(14,2),
    FOREIGN KEY (id_compra) REFERENCES compras(id_compra)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;