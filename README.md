# TiendaGenerica-Microservicios

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
TiendaGenerica-Microservicios
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
│   ├── docker-compose.yml
│   └── deploy-jars.bat
│
├── TiendaGenerica-Frontend-React
│
├── docker-compose.yml
└── start-services.bat
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
git clone https://github.com/MakingMeans/TiendaGenerica-Microservicios
cd TiendaGenerica-Microservicios
```

---

## 2 Iniciar el sistema

Ejecutar este comando en la carpeta principal del proyecto:

```
docker-compose up --build
```

---

# 3 Acceso al sistema

Frontend:

```
http://localhost:3000
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

# 4 Apagar el sistema

Ejecutar este comando en la carpeta principal del proyecto:

```
docker-compose down -v
```

Tambien es posible manejar toda la ejecucion de forma sencilla ejecutando:
```
start-services.bat
```

Esto detendrá:

* Base de datos Docker
* Microservicios
* Frontend
