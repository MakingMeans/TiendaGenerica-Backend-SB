@echo off

echo =====================================
DETENIENDO TIENDA GENERICA
=====================================

echo.
echo Cerrando procesos Java...

taskkill /F /IM java.exe

echo.
echo Cerrando Node...

taskkill /F /IM node.exe

echo.
echo Deteniendo contenedores Docker...

cd TiendaGenerica-Backend-SpringBoot

docker compose down -v

cd ..

echo.
echo =====================================
SISTEMA DETENIDO
=====================================
pause