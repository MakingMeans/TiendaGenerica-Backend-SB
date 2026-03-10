@echo off
title TIENDA GENERICA DOCKER

echo ====================================
echo COMPILANDO MICROSERVICIOS
echo ====================================

docker compose down -v

cd TiendaGenerica-Backend-SpringBoot

call mvn clean package -DskipTests

if %errorlevel% neq 0 (
    echo.
    echo ERROR COMPILANDO MICROSERVICIOS
    pause
    exit
)

cd ..

echo.
echo ====================================
echo INICIANDO DOCKER
echo ====================================

docker compose up -d --build

echo.
echo Esperando que los servicios inicien...
timeout /t 15 /nobreak >nul

echo.
echo ====================================
echo ABRIENDO APLICACIONES
echo ====================================

start http://localhost:3039
start http://localhost:8761

echo.
echo ====================================
echo SISTEMA CORRIENDO
echo ====================================
echo.
echo Presione cualquier tecla para detener todo el sistema
pause >nul

echo.
echo ====================================
echo DETENIENDO SISTEMA
echo ====================================

docker compose down -v

echo.
echo Contenedores detenidos correctamente.

echo.
echo ====================================
echo SISTEMA APAGADO
echo ====================================

pause