# Multi-stage Docker build for HireMind Backend
FROM maven:3.9.9-eclipse-temurin-21 AS build
WORKDIR /app

COPY pom.xml .
# Override release to 21 for cloud container standard compatibility
RUN sed -i 's/<java.version>25<\/java.version>/<java.version>21<\/java.version>/g' pom.xml

COPY src ./src
RUN mvn clean package -DskipTests

FROM eclipse-temurin:21-jre
WORKDIR /app

COPY --from=build /app/target/hiremind-backend-1.0.0.jar app.jar

ENV PORT=8080
EXPOSE 8080

ENTRYPOINT ["java", "-Dspring.profiles.active=prod", "-jar", "app.jar"]
