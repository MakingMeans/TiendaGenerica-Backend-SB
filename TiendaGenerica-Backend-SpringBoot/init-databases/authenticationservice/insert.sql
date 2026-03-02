INSERT INTO usuarios (cedula, nombre, apellido, correo, username, password, activo)
VALUES
('1001','Admin','Principal','admin@tienda.com','admin','$2a$10$hSbdQSOrialhDy8VvYPRJuS3Juy8qbXH32boA64Kt4PT9P4bUVAc6',TRUE);

INSERT INTO roles (nombre, descripcion) VALUES
('ADMIN', 'Control total del sistema y administración de usuarios y configuración'),
('GERENTE', 'Supervisión del negocio, acceso a reportes, inventario y ventas'),
('CAJERO', 'Registro de ventas y atención al cliente con permisos limitados'),
('INVENTARIO', 'Gestión de productos, proveedores y carga de inventario'),
('USER', 'Rol base por defecto con permisos mínimos de autenticación');

INSERT INTO usuario_rol (id_usuario, id_rol)
VALUES (1, 1);