# TiendaGenerica-Backend-SB

Sistema web para la gestión de una tienda desarrollado con **Spring Boot + MySQL**, como proyecto académico. Aplicación web en **Java** que permite gestionar las transacciones comerciales de una tienda, administrando usuarios, clientes, proveedores, productos y ventas.

---

# Funcionalidades principales

- Login de usuarios
- Gestión de usuarios
- Gestión de clientes
- Gestión de proveedores
- Carga masiva de productos (CSV)
- Registro de ventas
- Reportes y consultas

---

# Modulos

## Login del sistema
Ingresar con usuario y contraseña para acceder al sistema de la tienda.  

✔ Usuario inicial:
admininicial / admin123456

---

## Gestión de usuarios
El administrador puede crear, editar, eliminar y listar usuarios para controlar quién puede usar el sistema.

Datos:
- Cédula
- Nombre
- Correo
- Usuario
- Contraseña

---

## Gestión de clientes
El empleado puede registrar y administrar clientes para poder realizar ventas.

Datos:
- Cédula
- Nombre
- Dirección
- Teléfono
- Correo

---

## Gestión de proveedores
El administrador puede gestionar proveedores para asociarlos a los productos.

Datos:
- NIT
- Nombre
- Dirección
- Teléfono
- Ciudad

---

## Carga de productos por CSV
El usuario puede cargar productos desde un archivo CSV para registrar múltiples productos rápidamente.

Campos:
- código_producto
- nombre_producto
- nit_proveedor
- precio_compra
- iva_compra
- precio_venta

Validaciones:
- Formato CSV
- NIT existente

---

## Registro de ventas
El cajero puede registrar ventas de productos para generar facturas y totales.

Funciones:
- Buscar cliente
- Agregar productos
- Calcular IVA
- Calcular total
- Guardar venta y detalle

Tablas:
- ventas
- detalleVentas

---

## Reportes y consultas
El administrador consultar información para analizar el negocio.

Reportes:
- Listado de usuarios
- Listado de clientes
- Total de ventas por cliente

---

# Tecnologías

Backend:
- Java JDK 11
- Spring Boot 2.4.5
- Maven
- Tomcat

Base de datos:
- MySQL 8

Control de versiones:
- Git + GitHub

---

# Requerimientos

Instalar:

- JDK 11 → https://adoptium.net/temurin/releases/?version=11
- Maven 3.6+ → https://maven.apache.org/download.cgi
- MySQL 8 → https://dev.mysql.com/downloads/installer/
- MySQL Workbench → https://dev.mysql.com/downloads/workbench/
- Eclipse → https://www.eclipse.org/downloads/packages/
- Git → https://git-scm.com/downloads

Verificar:

```
java -version
mvn -v
mysql --version
git --version
```

---

# Configuración del Proyecto

## 1 Clonar repositorio

```
git clone https://github.com/MakingMeans/TiendaGenerica-Backend-SB
cd TiendaGenerica-Backend-SB
```

---

## 2 Crear Base de Datos

```
CREATE DATABASE tienda_db;
```

---

## 3 Configurar conexión

Editar:

```
src/main/resources/application.properties
```

```
spring.datasource.url=jdbc:mysql://localhost:3306/tienda_db
spring.datasource.username=root
spring.datasource.password=tu_password
spring.jpa.hibernate.ddl-auto=update
```

---

## 4 Ejecutar proyecto

```
mvn spring-boot:run
```

o

```
mvn clean install
java -jar target/*.jar
```

---

# Acceso

```
http://localhost:8080
```

Usuario inicial:

```
admininicial
admin123456
```

---

# GitFlow

Ramas:

- main → versión estable
- develop → integración
- feature/* → nuevas funcionalidades

