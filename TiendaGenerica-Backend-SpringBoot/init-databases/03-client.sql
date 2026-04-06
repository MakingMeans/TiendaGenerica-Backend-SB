CREATE DATABASE IF NOT EXISTS clientservice;
USE clientservice;

-- create.sql
CREATE TABLE clientes (
    id_cliente BIGINT AUTO_INCREMENT PRIMARY KEY,
    cedula VARCHAR(20) NOT NULL UNIQUE,
    nombre VARCHAR(50) NOT NULL,
    apellido VARCHAR(50) NOT NULL,
    direccion VARCHAR(150),
    telefono VARCHAR(20),
    email VARCHAR(100),
    activo BOOLEAN DEFAULT TRUE,
    fecha_registro DATETIME DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- insert.sql
SET NAMES utf8mb4;

INSERT INTO clientes (cedula,nombre,apellido,direccion,telefono,email,activo) VALUES
('9001','Juan','Pérez','Calle 10 #20-30','3001112222','juan@mail.com',TRUE),
('9002','Laura','Gómez','Cra 50 #40-10','3003334444','laura@mail.com',TRUE),
('9003','Carlos','Ramírez','Calle 8 #15-20','3005551111','carlos@mail.com',TRUE),
('9004','Ana','Martínez','Cra 12 #45-33','3005552222','ana@mail.com',TRUE),
('9005','Pedro','López','Calle 30 #10-50','3005553333','pedro@mail.com',TRUE),
('9006','Sofía','Hernández','Cra 18 #12-90','3005554444','sofia@mail.com',TRUE),
('9007','Luis','Castro','Calle 90 #20-11','3005555555','luis@mail.com',TRUE),
('9008','Camila','Torres','Cra 45 #22-10','3005556666','camila@mail.com',TRUE),
('9009','Andrés','Morales','Calle 60 #33-21','3005557777','andres@mail.com',TRUE),
('9010','Daniela','Rojas','Cra 25 #10-20','3005558888','daniela@mail.com',TRUE),
('9011','Miguel','Suárez','Calle 14 #55-20','3001113333','miguel@mail.com',TRUE),
('9012','Valentina','Ortiz','Cra 22 #40-33','3001114444','valentina@mail.com',TRUE),
('9013','Jorge','Vargas','Calle 17 #18-20','3001115555','jorge@mail.com',TRUE),
('9014','Paula','Navarro','Cra 11 #22-10','3001116666','paula@mail.com',TRUE),
('9015','Ricardo','Mendoza','Calle 12 #10-15','3001117777','ricardo@mail.com',TRUE),
('9016','Natalia','Guerrero','Cra 14 #80-33','3001118888','natalia@mail.com',TRUE),
('9017','Fernando','Cruz','Calle 44 #20-11','3002221111','fernando@mail.com',TRUE),
('9018','Alejandra','Salazar','Cra 19 #33-44','3002222222','alejandra@mail.com',TRUE),
('9019','Esteban','Pineda','Calle 50 #10-22','3002223333','esteban@mail.com',TRUE),
('9020','Lucía','Peña','Cra 24 #66-10','3002224444','lucia@mail.com',TRUE),
('9021','Sebastián','Cárdenas','Calle 28 #12-13','3002225555','sebastian@mail.com',TRUE),
('9022','Mariana','Delgado','Cra 13 #77-20','3002226666','mariana@mail.com',TRUE),
('9023','Gabriel','Acosta','Calle 15 #15-15','3002227777','gabriel@mail.com',TRUE),
('9024','Isabella','Campos','Cra 90 #10-10','3002228888','isabella@mail.com',TRUE),
('9025','David','Rincón','Calle 11 #11-11','3003331111','david@mail.com',TRUE),
('9026','Sara','Bautista','Cra 66 #22-44','3003332222','sara@mail.com',TRUE),
('9027','Diego','Reyes','Calle 88 #20-33','3003333333','diego@mail.com',TRUE),
('9028','Carolina','Soto','Cra 21 #21-21','3003335555','carolina@mail.com',TRUE),
('9029','Mateo','Aguilar','Calle 41 #30-10','3003336666','mateo@mail.com',TRUE),
('9030','Juliana','Figueroa','Cra 31 #10-77','3003337777','juliana@mail.com',TRUE);