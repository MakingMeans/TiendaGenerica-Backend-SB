CREATE DATABASE IF NOT EXISTS supplierservice;
USE supplierservice;

-- create.sql
CREATE TABLE proveedores (
    id_proveedor BIGINT AUTO_INCREMENT PRIMARY KEY,
    nit VARCHAR(20) NOT NULL UNIQUE,
    nombre VARCHAR(100) NOT NULL,
    direccion VARCHAR(150),
    telefono VARCHAR(20),
    ciudad VARCHAR(100),
    email VARCHAR(100),
    activo BOOLEAN DEFAULT TRUE,
    fecha_registro DATETIME DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- insert.sql
SET NAMES utf8mb4;

INSERT INTO proveedores (nit,nombre,direccion,telefono,ciudad,email,activo) VALUES
('900123','Distribuciones Andinas','Zona Industrial','6011234567','Bogotá','proveedor@andinas.com',TRUE),
('900124','Comercializadora El Dorado','Av. Boyacá #45-20','6012345678','Bogotá','contacto@eldorado.com',TRUE),
('900125','Insumos Industriales SAS','Calle 80 #70-15','6013456789','Bogotá','ventas@insumosindustriales.com',TRUE),
('900126','Tecnología y Servicios LTDA','Carrera 15 #93-60','6014567890','Bogotá','info@tecservicios.com',TRUE),
('900127','Distribuidora Central','Calle 26 #68-40','6015678901','Bogotá','pedidos@distribuidoracentral.com',TRUE),
('900128','Suministros Globales','Zona Franca','6016789012','Bogotá','ventas@suministrosglobales.com',TRUE),
('900129','Abastos Nacionales','Corabastos','6017890123','Bogotá','ventas@abastos.com',TRUE),
('900130','Frutas Tropicales SAS','Calle 13 #90-10','6018901234','Bogotá','contacto@frutastropicales.com',TRUE),
('900131','AgroProductos Colombia','Zona Industrial Montevideo','6019012345','Bogotá','ventas@agroproductos.com',TRUE),
('900132','Distribuciones Alimentarias','Av. Caracas #63-22','6013451122','Bogotá','pedidos@distribucionesal.com',TRUE),
('900133','Comercializadora Campesina','Calle 170 #20-15','6013452233','Bogotá','ventas@campesina.com',TRUE),
('900134','Frutera Nacional','Corabastos Bodega 22','6013453344','Bogotá','contacto@fruteranacional.com',TRUE),
('900135','Verduras Selectas','Calle 72 #24-50','6013454455','Bogotá','ventas@verdurasselectas.com',TRUE),
('900136','AgroDistribuciones SAS','Av. Ciudad de Cali #26-40','6013455566','Bogotá','info@agrodistribuciones.com',TRUE),
('900137','Mercados Mayoristas','Central de Abastos','6013456677','Bogotá','pedidos@mercadosmayoristas.com',TRUE);