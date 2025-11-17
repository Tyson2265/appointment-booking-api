# -----------------------------------------------
# STAGE 1: Build the backend
# -----------------------------------------------
FROM maven:3.9.5-eclipse-temurin-17 AS backend-build
WORKDIR /app

# Copy pom and download dependencies
COPY backend/pom.xml ./
RUN mvn dependency:go-offline

# Copy backend source code
COPY backend/src ./src

# Build the Spring Boot JAR
RUN mvn clean package -DskipTests

# -----------------------------------------------
# STAGE 2: Runtime image
# -----------------------------------------------
FROM eclipse-temurin:17-jre-alpine AS backend-runtime
WORKDIR /app

# Copy the built JAR from the build stage
COPY --from=backend-build /app/target/*.jar app.jar

EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
