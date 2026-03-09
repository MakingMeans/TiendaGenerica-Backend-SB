SET NAMES utf8mb4;

INSERT INTO compras (numero_compra,id_proveedor,total,estado)
VALUES ('COMP-00001',1,120000,'RECIBIDA');

INSERT INTO detalle_compras (id_compra,id_producto,cantidad,precio_unitario,total)
VALUES (1,1,3,25505,76515);