package swd392.apigatewayservice.adapter;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;

import swd392.apigatewayservice.dto.ApiResponse;

import java.util.List;

/*
 * File: IdentityClient.java
 * Description: Call api from identity-service to authenticate token.
 *
 * Version History:
 * ----------------------------------------------------------------------------
 * v1.0 - ??/3/2025 - Nguyen Tien Thuan - Do authenticateToken method.
 * ----------------------------------------------------------------------------
 *
 * Author(s): Nguyen Tien Thuan
 * Last Modified: 26/3/2025
 * Notes:
 */
@FeignClient(name = "identity-service", url = "http://localhost:8989/api/v1/identity")
public interface IdentityClient {

    @PostMapping("/authenticate/token/{token}") // ResponseEntity<ApiResponse<Object>>
    ApiResponse<List<String>> authenticateToken(@PathVariable("token") String token);

}
