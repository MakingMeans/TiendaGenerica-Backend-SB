CREATE TABLE compras (
    id_compra BIGINT AUTO_INCREMENT PRIMARY KEY,
    numero_compra VARCHAR(50) NOT NULL UNIQUE,
    id_proveedor BIGINT NOT NULL,
    fecha DATETIME DEFAULT CURRENT_TIMESTAMP,
    total DECIMAL(14,2),
    estado VARCHAR(50)
);

CREATE TABLE detalle_compras (
    id_detalle_compra BIGINT AUTO_INCREMENT PRIMARY KEY,
    id_compra BIGINT NOT NULL,
    id_producto BIGINT NOT NULL,
    cantidad INT NOT NULL,
    precio_unitario DECIMAL(12,2) NOT NULL,
    total DECIMAL(14,2),
    FOREIGN KEY (id_compra) REFERENCES compras(id_compra)
);