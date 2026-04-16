@echo off
title TIENDA GENERICA - CONTROL

echo =============================
echo INICIANDO TIENDA GENERICA
echo =============================

echo Levantando servicios...
start "DOCKER LOGS" cmd /k docker-compose up --build

echo Esperando a que levanten los servicios...
timeout /t 240 /nobreak >nul

echo Abriendo navegador...
start http://localhost:3000
start http://localhost:8761

echo.
echo =============================
echo SISTEMA CORRIENDO
echo =============================
echo Presione una tecla para detener todo
pause >nul

echo.
echo =============================
echo DETENIENDO SISTEMA
echo =============================

echo Deteniendo docker...
docker compose down -v

echo Cerrando ventana adicional de cmd...
taskkill /FI "WINDOWTITLE eq DOCKER LOGS" /F >nul 2>&1

echo.
echo =============================
echo SISTEMA DETENIDO
echo =============================
pause