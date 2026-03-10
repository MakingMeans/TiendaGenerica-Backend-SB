@echo off

echo =============================
echo INICIANDO TIENDA GENERICA
echo =============================

docker compose up --build -d

echo Esperando que arranque el sistema...
timeout /t 20

start http://localhost:5173
start http://localhost:8761
start http://localhost:8080

echo Sistema iniciado
pause