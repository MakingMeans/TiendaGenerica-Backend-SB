INSERT INTO productos (codigo,nombre,precio_venta,iva,stock_actual,stock_minimo,stock_maximo) VALUES
('P001','Melocotones',30351,19,50,5,100),
('P002','Manzanas',21549,19,60,5,100),
('P003','Plátanos',35320,19,40,5,100),
('P004','Lechuga',35448,19,70,5,100),
('P005','Tomates',15159,19,80,5,100);

INSERT INTO producto_proveedor (id_producto,id_proveedor,precio_compra) VALUES
(1,1,25505),
(2,1,18108),
(3,1,29681);