package swd392.apigatewayservice.configuration;

import org.springframework.stereotype.Service;
import org.springframework.http.server.reactive.ServerHttpRequest;
import java.util.List;
import java.util.function.Predicate;

/*
 * File: <file_name>
 * Description: <brief description of what this file does>
 *
 * Version History:
 * ----------------------------------------------------------------------------
 * v1.0 - ?/2/2025 - Nguyen Tien Thuan - Initial open authentication api.
 * ----------------------------------------------------------------------------
 *
 * Author(s): Nguyen Tien Thuan
 * Last Modified: 26/3/2025
 * Notes:
 */
@Service
public class RouterValidator {
    /**
     * List of open endpoints that do not require authentication
     */
    public static final List<String> openEndPoints = List.of(
            "/auth/**",
            "/api/v1/identity",
            "/api/v1/identity/**",
            "/api/auth/**",
            "/api/v1/chatbot/health",
            "/api/v1/chatbot/test-redis",
            "/api/v1/aws/s3/health",
            "/api/v1/law/health",
            "/api/v1/law/get",
            "/api/v1/law/get-all",
            "/api/v1/law/type/get",
            "/api/v1/law/type/get-all",
            "/api/v1/user-packages/usage-package/get-all",
            "/api/v1/user-packages/usage-package/get"
    );

    /**
     * This method is used to check if the request is secured or not.
     * If the request is secured, it will return true.
     */
    public Predicate<ServerHttpRequest> isSecured = serverHttpRequest -> openEndPoints.stream()
                    .noneMatch(uri -> serverHttpRequest.getURI().getPath().contains(uri));
}
