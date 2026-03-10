@echo off

echo ==========================================
CONFIGURANDO ENTORNO - TIENDA GENERICA
==========================================

echo.

:: -------------------------
:: JAVA 17
:: -------------------------
echo Verificando Java...

java -version >nul 2>&1

IF %ERRORLEVEL% NEQ 0 (
    echo Java no encontrado. Descargando JDK 17...

    powershell -Command "Invoke-WebRequest https://download.oracle.com/java/17/latest/jdk-17_windows-x64_bin.exe -OutFile jdk17.exe"

    echo Instalando Java...
    start /wait jdk17.exe

) ELSE (
    echo Java ya instalado
)

echo.

:: -------------------------
:: MAVEN
:: -------------------------
echo Verificando Maven...

mvn -version >nul 2>&1

IF %ERRORLEVEL% NEQ 0 (

    echo Maven no encontrado. Descargando Maven...

    powershell -Command "Invoke-WebRequest https://downloads.apache.org/maven/maven-3/3.9.9/binaries/apache-maven-3.9.9-bin.zip -OutFile maven.zip"

    powershell -Command "Expand-Archive maven.zip -DestinationPath C:\maven"

    setx MAVEN_HOME C:\maven\apache-maven-3.9.9
    setx PATH "%PATH%;C:\maven\apache-maven-3.9.9\bin"

) ELSE (
    echo Maven ya instalado
)

echo.

:: -------------------------
:: DOCKER
:: -------------------------
echo Verificando Docker...

docker -v >nul 2>&1

IF %ERRORLEVEL% NEQ 0 (

    echo Docker no encontrado. Descargando Docker Desktop...

    powershell -Command "Invoke-WebRequest https://desktop.docker.com/win/main/amd64/Docker%20Desktop%20Installer.exe -OutFile docker_installer.exe"

    start /wait docker_installer.exe install

) ELSE (
    echo Docker ya instalado
)

echo.

:: -------------------------
:: NODE
:: -------------------------
echo Verificando NodeJS...

node -v >nul 2>&1

IF %ERRORLEVEL% NEQ 0 (

    echo NodeJS no encontrado. Descargando NodeJS...

    powershell -Command "Invoke-WebRequest https://nodejs.org/dist/v20.11.0/node-v20.11.0-x64.msi -OutFile node_installer.msi"

    start /wait msiexec /i node_installer.msi

) ELSE (
    echo NodeJS ya instalado
)

echo.
echo ==========================================
ENTORNO LISTO
==========================================
pause