FROM eclipse-temurin:17-jdk

WORKDIR /app

COPY target/catalog-service-1.0.0.jar app.jar

EXPOSE 8084

ENTRYPOINT ["java","-jar","app.jar"]