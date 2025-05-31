# Hướng dẫn sử dụng trước khi dùng

## Docker build
`docker-compose -f docker-compose-final.yml -p aas-microservices up --build -d`

## Comment để theo dõi quá trình làm
### - Sau khi code xong 1 hàm hoặc thay đổi file, bắt buộc phải ghi log
```java
/*
 * File: <file_name>
 * Description: <brief description of what this file does>
 * 
 * Version History:
 * ----------------------------------------------------------------------------
 * v1.0 - <Date> - <Author Name> - Initial creation.
 * v1.1 - <Date> - <Author Name> - Added feature X, fixed bug Y.
 * v1.2 - <Date> - <Author Name> - Refactored code, optimized function Z.
 * ----------------------------------------------------------------------------
 * 
 * Author(s): <Your Name(s)>
 * Last Modified: <Date>
 * Notes: <Any additional notes>
 */
```
## DEVCONTAINER FOR IDE

### Lấy Id của container
docker ps

### Chuyển terminal qua môi trường của devcontainer
docker exec -it <container_name_or_id> /bin/bash
Example:
docker exec -it 18bdb4e7d22e /bin/bash

### Chuyển qua fodler workspace
cd ./workspace/microservices.springframework

### Chạy service có đọc .env
cd ./<service_name>
export $(grep -v '^#' .env | xargs) && mvn spring-boot:run

