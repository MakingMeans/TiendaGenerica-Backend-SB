@echo off
title SPRING BOOT - MAVEN CONTROL

echo =============================
echo INICIANDO PROYECTO SPRING BOOT
echo =============================

echo Compilando con Maven (sin tests)...
call mvn clean package -DskipTests

if %ERRORLEVEL% neq 0 (
    echo.
    echo ERROR EN LA COMPILACION
    pause
    exit /b
)

echo.
echo =============================
echo COMPILACION EXITOSA
echo =============================

echo Levantando aplicaciones...

REM Ejecutar todos los JAR generados en target
for %%f in (target\*.jar) do (
    echo Iniciando %%f ...
    start "APP %%~nxf" cmd /k java -jar "%%f"
)

echo Esperando a que levanten las apps...
timeout /t 30 /nobreak >nul

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

echo Cerrando aplicaciones...
taskkill /FI "WINDOWTITLE eq APP *" /F >nul 2>&1

echo.
echo =============================
echo SISTEMA DETENIDO
echo =============================
pause