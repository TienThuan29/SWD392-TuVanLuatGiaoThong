# Kotlin Development Container

This devcontainer provides a complete Kotlin development environment with the following components:

## Included Software

- **JDK 21** - OpenJDK 21 LTS
- **Kotlin** - Latest stable Kotlin compiler (1.9.22)
- **Maven 3.9.9** - Build automation tool
- **RabbitMQ** - Message broker with management UI
- **Redis** - In-memory data store
- **Elasticsearch** - Search and analytics engine

## Port Configuration

The following ports are exposed:

- **8222, 8989, 8080, 8888** - Application ports
- **8090-8096** - Additional service ports
- **5672** - RabbitMQ AMQP port
- **15672** - RabbitMQ Management UI
- **6379** - Redis port
- **9200** - Elasticsearch HTTP port
- **9300** - Elasticsearch transport port

## Service Access

### RabbitMQ Management UI
- URL: http://localhost:15672
- Username: `admin`
- Password: `admin123`

### Redis
- Host: `redis`
- Port: `6379`
- No authentication required

### Elasticsearch
- URL: http://localhost:9200
- No authentication required

## Getting Started

1. Open this folder in VS Code
2. When prompted, select "Reopen in Container"
3. Wait for the container to build and start
4. Access services through the exposed ports

## VS Code Extensions

The following extensions are automatically installed:

- Kotlin Language Support
- Java Extension Pack
- Maven for Java
- Docker
- YAML Support
- JSON Support

## Environment Variables

- `JAVA_HOME`: `/usr/lib/jvm/java-21-openjdk-amd64`
- `KOTLIN_HOME`: `/opt/kotlinc`
- `PATH`: Includes Java, Kotlin, and Maven binaries

## File Structure

```
.devcontainer/
├── devcontainer.json    # VS Code devcontainer configuration
├── docker-compose.yml   # Multi-service container setup
├── Dockerfile          # Main development container
└── README.md           # This file
```

## Troubleshooting

### Container won't start
- Ensure Docker is running
- Check that all required ports are available
- Try rebuilding the container: `Ctrl+Shift+P` → "Dev Containers: Rebuild Container"

### Services not accessible
- Verify services are running: `docker-compose ps`
- Check service logs: `docker-compose logs [service-name]`

### Performance issues
- Adjust Elasticsearch memory settings in docker-compose.yml
- Increase Docker memory allocation if needed