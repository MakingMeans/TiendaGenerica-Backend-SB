@echo off

echo =====================================
INICIANDO TIENDA GENERICA
=====================================

echo.
echo Entrando al backend...

cd TiendaGenerica-Backend-SpringBoot

echo.
echo Levantando base de datos con Docker...

docker compose up -d

echo Esperando que MySQL inicie...
timeout /t 15

echo.
echo Iniciando Eureka Server...

start cmd /k "cd eureka-server && mvn spring-boot:run"
timeout /t 10

echo Iniciando Authentication Service...

start cmd /k "cd authentication-service && mvn spring-boot:run"
timeout /t 5

echo Iniciando Client Service...

start cmd /k "cd client-service && mvn spring-boot:run"
timeout /t 5

echo Iniciando Supplier Service...

start cmd /k "cd supplier-service && mvn spring-boot:run"
timeout /t 5

echo Iniciando Catalog Service...

start cmd /k "cd catalog-service && mvn spring-boot:run"
timeout /t 5

echo Iniciando Buy Service...

start cmd /k "cd buy-service && mvn spring-boot:run"
timeout /t 5

echo Iniciando Sale Service...

start cmd /k "cd sale-service && mvn spring-boot:run"
timeout /t 5

echo Iniciando API Gateway...

start cmd /k "cd api-gateway && mvn spring-boot:run"

echo.
echo Iniciando Frontend...

cd ..
cd TiendaGenerica-Frontend-React

start cmd /k "npm install && npm run dev"

echo Esperando frontend...
timeout /t 8

echo.
echo Abriendo navegador...

start http://localhost:3039

echo.
echo =====================================
SISTEMA INICIADO
=====================================
pause