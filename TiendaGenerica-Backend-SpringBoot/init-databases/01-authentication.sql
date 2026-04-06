CREATE DATABASE IF NOT EXISTS authenticationservice;
USE authenticationservice;

-- create.sql
CREATE TABLE IF NOT EXISTS usuarios (
    id_usuario BIGINT AUTO_INCREMENT PRIMARY KEY,
    cedula VARCHAR(20) NOT NULL UNIQUE,
    nombre VARCHAR(50) NOT NULL,
    apellido VARCHAR(50) NOT NULL,
    correo VARCHAR(100) NOT NULL UNIQUE,
    username VARCHAR(25) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    activo BOOLEAN DEFAULT TRUE,
    fecha_creacion DATETIME DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS roles (
    id_rol BIGINT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL UNIQUE,
    descripcion VARCHAR(150)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS usuario_rol (
    id_usuario BIGINT NOT NULL,
    id_rol BIGINT NOT NULL,
    PRIMARY KEY (id_usuario, id_rol),
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario) ON DELETE CASCADE,
    FOREIGN KEY (id_rol) REFERENCES roles(id_rol) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- insert.sql
SET NAMES utf8mb4;

INSERT INTO usuarios (cedula,nombre,apellido,correo,username,password,activo) VALUES
('1001','Admin','Principal','admin@tienda.com','admin','$2a$10$hSbdQSOrialhDy8VvYPRJuS3Juy8qbXH32boA64Kt4PT9P4bUVAc6',TRUE),
('1002','Carlos','Delgado','gerente@tienda.com','gerente','$2a$10$hSbdQSOrialhDy8VvYPRJuS3Juy8qbXH32boA64Kt4PT9P4bUVAc6',TRUE),
('1003','Ana','Flechas','cajero@tienda.com','cajero','$2a$10$hSbdQSOrialhDy8VvYPRJuS3Juy8qbXH32boA64Kt4PT9P4bUVAc6',TRUE),
('1004','Luis','Leguizamon','inventario@tienda.com','inventario','$2a$10$hSbdQSOrialhDy8VvYPRJuS3Juy8qbXH32boA64Kt4PT9P4bUVAc6',TRUE),
('1005','Maria','Guaje','usuario@tienda.com','usuario','$2a$10$hSbdQSOrialhDy8VvYPRJuS3Juy8qbXH32boA64Kt4PT9P4bUVAc6',TRUE);

INSERT INTO roles (nombre, descripcion) VALUES
('ROLE_ADMIN', 'Control total del sistema y administración de usuarios y configuración'),
('ROLE_GERENTE', 'Supervisión del negocio, acceso a reportes, inventario y ventas'),
('ROLE_CAJERO', 'Registro de ventas y atención al cliente con permisos limitados'),
('ROLE_INVENTARIO', 'Gestión de productos, proveedores y carga de inventario'),
('ROLE_USER', 'Rol base por defecto con permisos mínimos de autenticación');

INSERT INTO usuario_rol (id_usuario, id_rol) VALUES
(1,1),
(2,2),
(3,3),
(4,4),
(5,5);