FROM eclipse-temurin:17-jdk

WORKDIR /app

COPY target/sale-service-1.0.0.jar app.jar

EXPOSE 8086

ENTRYPOINT ["java","-jar","app.jar"]