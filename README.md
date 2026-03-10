# TiendaGenerica-TransaccionesComerciales

Sistema web para la gestión de transacciones comerciales de una tienda desarrollado con una **arquitectura de microservicios** utilizando **Spring Boot + Spring Cloud + React + MySQL**.

El sistema permite administrar usuarios, clientes, proveedores, productos y ventas, además de gestionar autenticación segura mediante **JWT** y **Spring Security**.

---

# Arquitectura del Sistema

El sistema está dividido en dos grandes componentes:

### Backend

Arquitectura de **microservicios con Spring Boot**.

Servicios:

* **Eureka Server** → Registro y descubrimiento de servicios
* **API Gateway** → Punto de entrada único para el frontend
* **Authentication Service** → Autenticación y generación de JWT
* **Client Service** → Gestión de clientes
* **Supplier Service** → Gestión de proveedores
* **Catalog Service** → Gestión de productos
* **Buy Service** → Gestión de compras
* **Sale Service** → Gestión de ventas

Todos los servicios se registran automáticamente en **Eureka**.

---

### Frontend

Aplicación web desarrollada con **React**.

Se comunica con el backend a través del **API Gateway**.

---

# Arquitectura Técnica

Backend:

* Java 17
* Spring Boot 3
* Spring Security
* Spring Cloud
* Netflix Eureka
* API Gateway
* JWT Authentication
* Maven

Base de datos:

* MySQL 8
* Docker Compose

Frontend:

* React
* Node.js
* Vite

Control de versiones:

* Git
* GitHub

---

# Estructura del Proyecto

```
TiendaGenerica-TransaccionesComerciales
│
├── TiendaGenerica-Backend-SpringBoot
│   ├── api-gateway
│   ├── authentication-service
│   ├── buy-service
│   ├── catalog-service
│   ├── client-service
│   ├── eureka-server
│   ├── sale-service
│   ├── supplier-service
│   ├── init-databases
│   └── docker-compose.yml
│
├── TiendaGenerica-Frontend-React
│
├── start_system.bat
├── stop_system.bat
└── setup_env.bat
```

---

# Funcionalidades del Sistema

## Autenticación

* Registro de usuarios
* Inicio de sesión
* Generación de token JWT
* Protección de endpoints mediante roles

Roles del sistema:

* ADMIN
* GERENTE
* CAJERO

---

## Gestión de Usuarios

Permite administrar usuarios del sistema.

Funciones:

* Crear usuarios
* Editar usuarios
* Eliminar usuarios
* Asignar roles

---

## Gestión de Clientes

Permite registrar y administrar clientes.

Datos registrados:

* Cédula
* Nombre
* Dirección
* Teléfono
* Correo

---

## Gestión de Proveedores

Administración de proveedores asociados a productos.

Datos:

* NIT
* Nombre
* Dirección
* Teléfono
* Ciudad

---

## Gestión de Productos

Administración del catálogo de productos de la tienda.

Funciones:

* Crear productos
* Editar productos
* Eliminar productos
* Consultar inventario

---

## Gestión de Compras

Registro de compras realizadas a proveedores.

Funciones:

* Registrar compra
* Asociar productos
* Actualizar inventario

---

## Gestión de Ventas

Registro de ventas realizadas a clientes.

Funciones:

* Buscar cliente
* Agregar productos
* Calcular IVA
* Calcular total
* Generar factura

---

# Requisitos del Sistema

Instalar:

* Java 17
* Maven 3.9+
* Docker Desktop
* Node.js 20+
* Git

Verificar instalación:

```
java -version
mvn -v
docker -v
node -v
git --version
```

---

# Ejecución del Sistema

## 1 Clonar repositorio

```
git clone https://github.com/MakingMeans/TiendaGenerica-TransaccionesComerciales
cd TiendaGenerica-TransaccionesComerciales
```

---

## 2 Iniciar el sistema

Ejecutar:

```
start_system.bat
```

Este script realiza automáticamente:

1. Levantar la base de datos con Docker
2. Iniciar Eureka Server
3. Iniciar API Gateway
4. Iniciar todos los microservicios
5. Iniciar el frontend React
6. Abrir el navegador automáticamente

---

# Acceso al sistema

Frontend:

```
http://localhost:3039
```

Eureka Dashboard:

```
http://localhost:8761
```

API Gateway:

```
http://localhost:8080
```

---

# Apagar el sistema

Ejecutar:

```
stop_system.bat
```

Esto detendrá:

* Base de datos Docker
* Microservicios
* Frontend
