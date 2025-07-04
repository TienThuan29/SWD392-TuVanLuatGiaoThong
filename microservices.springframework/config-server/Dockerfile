FROM openjdk:21-jdk-slim AS build
WORKDIR /app

# Install Maven
RUN apt-get update && \
    apt-get install -y maven && \
    rm -rf /var/lib/apt/lists/*

COPY pom.xml .
COPY src ./src
RUN mvn clean package -DskipTests

FROM openjdk:21-jdk-slim
WORKDIR /app
COPY --from=build /app/target/swd392-configserver-v1-0-0.jar swd392-configserver-v1-0-0.jar

RUN apt-get update && apt-get install -y curl && rm -rf /var/lib/apt/lists/*

# Define health check to verify if the application is running
HEALTHCHECK --interval=30s --timeout=10s --retries=3 \
    CMD curl --fail http://localhost:8888/actuator/health || exit 1

ENTRYPOINT ["java", "-jar", "swd392-configserver-v1-0-0.jar"]