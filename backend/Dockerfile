# Step 1: Build stage
FROM maven:3.9.6-eclipse-temurin-21 AS builder

WORKDIR /app

# Copy pom.xml and download dependencies first (caching layer)
COPY pom.xml .
RUN mvn dependency:go-offline

# Copy source code and build
COPY src ./src
RUN mvn clean package

# Step 2: Runtime stage
FROM eclipse-temurin:21-jdk-alpine

WORKDIR /app

# Copy only the fat JAR from builder
COPY --from=builder /app/target/*.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]



#Multistage Dockerfile for minimum size image
