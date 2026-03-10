FROM eclipse-temurin:17-jdk

WORKDIR /app

COPY target/buy-service-1.0.0.jar app.jar

EXPOSE 8085

ENTRYPOINT ["java","-jar","app.jar"]