-- Insertar usuario admin
INSERT INTO usuarios (cedula, nombre, apellido, correo, username, password, activo)
VALUES
('1001','Admin','Principal','admin@tienda.com','admin','$2a$10$hSbdQSOrialhDy8VvYPRJuS3Juy8qbXH32boA64Kt4PT9P4bUVAc6',TRUE);

-- Insertar roles
INSERT INTO roles (nombre, descripcion) VALUES
('ADMIN','Rol administrador'),
('CAJERO','Rol cajero de tienda'),
('GERENTE','Rol gerente de tienda');

-- Asignar rol ADMIN al usuario admin
INSERT INTO usuario_rol (id_usuario, id_rol)
VALUES (1, 1);