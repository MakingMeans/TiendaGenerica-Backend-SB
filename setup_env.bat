@echo off

echo ==========================================
echo CONFIGURANDO ENTORNO - TIENDA GENERICA
echo ==========================================

echo.

:: =========================
:: JAVA
:: =========================
echo Verificando Java...

java -version >nul 2>&1

IF %ERRORLEVEL% NEQ 0 (

    echo Java no encontrado. Descargando OpenJDK 17...

    powershell -Command "Invoke-WebRequest https://aka.ms/download-jdk/microsoft-jdk-17-windows-x64.msi -OutFile jdk17.msi"

    echo Instalando Java...
    start /wait msiexec /i jdk17.msi

) ELSE (

    echo Java ya instalado

)

echo.

:: =========================
:: MAVEN
:: =========================
echo Verificando Maven...

mvn -version >nul 2>&1

IF %ERRORLEVEL% NEQ 0 (

    echo Maven no encontrado. Descargando Maven...

    powershell -Command "Invoke-WebRequest https://archive.apache.org/dist/maven/maven-3/3.9.9/binaries/apache-maven-3.9.9-bin.zip -OutFile maven.zip"

    powershell -Command "Expand-Archive maven.zip -DestinationPath C:\maven"

    setx MAVEN_HOME C:\maven\apache-maven-3.9.9

    setx PATH "%PATH%;C:\maven\apache-maven-3.9.9\bin"

    echo Maven instalado. Reinicie la terminal para usarlo.

) ELSE (

    echo Maven ya instalado

)

echo.

:: =========================
:: DOCKER
:: =========================
echo Verificando Docker...

docker -v >nul 2>&1

IF %ERRORLEVEL% NEQ 0 (

    echo Docker no encontrado.
    echo Abriendo pagina oficial para descargar Docker Desktop...

    start https://www.docker.com/products/docker-desktop/

    echo.
    echo Instale Docker y luego vuelva a ejecutar este script.

) ELSE (

    echo Docker ya instalado

)

echo.

:: =========================
:: NODE
:: =========================
echo Verificando NodeJS...

node -v >nul 2>&1

IF %ERRORLEVEL% NEQ 0 (

    echo NodeJS no encontrado. Descargando NodeJS...

    powershell -Command "Invoke-WebRequest https://nodejs.org/dist/v20.11.0/node-v20.11.0-x64.msi -OutFile node_installer.msi"

    echo Instalando NodeJS...
    start /wait msiexec /i node_installer.msi

) ELSE (

    echo NodeJS ya instalado

)

echo.
echo ==========================================
echo ENTORNO LISTO
echo ==========================================

pause