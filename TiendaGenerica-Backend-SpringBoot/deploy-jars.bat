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
pause