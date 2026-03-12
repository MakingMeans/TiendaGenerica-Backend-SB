@echo off

echo =============================
echo INICIANDO TIENDA GENERICA
echo =============================

cd TiendaGenerica-Backend-SpringBoot

echo Levantando bases de datos...
docker compose up -d

timeout /t 10 /nobreak >nul

echo Iniciando microservicios...

start "EUREKA" cmd /c "cd eureka-server && mvn spring-boot:run"
start "AUTH" cmd /c "cd authentication-service && mvn spring-boot:run"
start "CLIENT" cmd /c "cd client-service && mvn spring-boot:run"
start "SUPPLIER" cmd /c "cd supplier-service && mvn spring-boot:run"
start "CATALOG" cmd /c "cd catalog-service && mvn spring-boot:run"
start "BUY" cmd /c "cd buy-service && mvn spring-boot:run"
start "SALE" cmd /c "cd sale-service && mvn spring-boot:run"
start "GATEWAY" cmd /c "cd api-gateway && mvn spring-boot:run"

timeout /t 10 /nobreak >nul

cd ..

echo Iniciando frontend...

cd TiendaGenerica-Frontend-React

start "FRONTEND" cmd /c "npm install && npm run dev"

timeout /t 20 /nobreak >nul

echo Abriendo navegador...

start http://localhost:3039
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

echo Cerrando procesos Java...
taskkill /F /IM java.exe >nul 2>&1

echo Cerrando Node...
taskkill /F /IM node.exe >nul 2>&1

echo Deteniendo docker...

cd TiendaGenerica-Backend-SpringBoot

docker compose down -v

cd ..

echo.
echo =============================
echo SISTEMA DETENIDO
echo =============================
pause