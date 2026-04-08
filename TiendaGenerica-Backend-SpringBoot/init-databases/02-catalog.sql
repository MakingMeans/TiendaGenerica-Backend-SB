CREATE DATABASE IF NOT EXISTS catalogservice;
USE catalogservice;

-- create.sql
CREATE TABLE productos (
    id_producto BIGINT AUTO_INCREMENT PRIMARY KEY,
    codigo VARCHAR(50) NOT NULL UNIQUE,
    nombre VARCHAR(100) NOT NULL,
    descripcion VARCHAR(255),
    precio_venta DECIMAL(12,2) NOT NULL,
    iva DECIMAL(5,2) NOT NULL,
    stock_actual INT NOT NULL DEFAULT 0,
    stock_minimo INT DEFAULT 0,
    stock_maximo INT DEFAULT 0,
    activo BOOLEAN DEFAULT TRUE,
    fecha_creacion DATETIME DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- insert.sql
SET NAMES utf8mb4;

INSERT INTO productos 
(codigo,nombre,descripcion,precio_venta,iva,stock_actual,stock_minimo,stock_maximo) VALUES
('PROD-0001','Melocotones','Melocotones frescos y dulces de temporada',4500,19,50,5,100),
('PROD-0002','Manzanas','Manzanas rojas frescas importadas',3200,19,60,5,100),
('PROD-0003','Plátanos','Plátanos maduros ideales para consumo diario',1200,19,40,5,100),
('PROD-0004','Lechuga','Lechuga fresca cultivada localmente',2800,19,70,5,100),
('PROD-0005','Tomates','Tomates rojos frescos para ensaladas',2500,19,80,5,100),
('PROD-0006','Peras','Peras frescas y jugosas',3500,19,50,5,100),
('PROD-0007','Uvas','Uvas verdes sin semillas',6500,19,50,5,100),
('PROD-0008','Piña','Piña dulce tropical',5500,19,40,5,100),
('PROD-0009','Sandía','Sandía roja refrescante',8000,19,30,5,100),
('PROD-0010','Papaya','Papaya madura rica en vitaminas',4500,19,40,5,100),
('PROD-0011','Zanahoria','Zanahoria fresca para ensaladas',1800,19,60,5,100),
('PROD-0012','Cebolla','Cebolla blanca de cocina',2000,19,70,5,100),
('PROD-0013','Ajo','Ajo fresco nacional',4200,19,40,5,100),
('PROD-0014','Papa','Papa criolla fresca seleccionada',2200,19,80,5,100),
('PROD-0015','Pepino','Pepino verde fresco',2000,19,60,5,100),
('PROD-0016','Brocoli','Brócoli verde rico en nutrientes',5200,19,50,5,100),
('PROD-0017','Coliflor','Coliflor fresca de cultivo nacional',4800,19,40,5,100),
('PROD-0018','Espinaca','Espinaca fresca rica en hierro',3200,19,40,5,100),
('PROD-0019','Aguacate','Aguacate hass cremoso',6000,19,50,5,100),
('PROD-0020','Mango','Mango dulce tropical',3500,19,50,5,100),
('PROD-0021','Limón','Limón ácido para jugos y cocina',900,19,70,5,100),
('PROD-0022','Naranja','Naranja jugosa ideal para jugos',1500,19,70,5,100),
('PROD-0023','Mandarina','Mandarina dulce fácil de pelar',1800,19,60,5,100),
('PROD-0024','Fresa','Fresas frescas seleccionadas',5200,19,40,5,100),
('PROD-0025','Arándanos','Arándanos frescos antioxidantes',9000,19,30,5,100),
('PROD-0026','Coco','Coco tropical natural',5500,19,30,5,100),
('PROD-0027','Guayaba','Guayaba rosada dulce',2500,19,40,5,100),
('PROD-0028','Maracuyá','Maracuyá ácido tropical',3000,19,40,5,100),
('PROD-0029','Granadilla','Granadilla dulce fresca',3500,19,40,5,100),
('PROD-0030','Remolacha','Remolacha fresca para ensaladas',2000,19,50,5,100),
('PROD-0031','Apio','Apio verde fresco',2200,19,50,5,100),
('PROD-0032','Calabacín','Calabacín verde fresco',2600,19,40,5,100),
('PROD-0033','Pimentón','Pimentón rojo fresco',4500,19,40,5,100),
('PROD-0034','Maíz','Maíz tierno para consumo',1800,19,50,5,100),
('PROD-0035','Champiñones','Champiñones frescos cultivados',7000,19,30,5,100);