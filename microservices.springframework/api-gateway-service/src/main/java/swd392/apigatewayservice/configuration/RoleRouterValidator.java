package swd392.apigatewayservice.configuration;

import org.springframework.stereotype.Service;
import java.util.List;

/*
 * File: RoleRouterValidator.java
 * Description: Define the endpoints for each role, and validate the role of the user.
 *
 * Version History:
 * ----------------------------------------------------------------------------
 * v1.0 - ?/3/2025 - Nguyen Tien Thuan - Define the general end points
 * ----------------------------------------------------------------------------
 *
 * Author(s): Nguyen Tien Thuan
 * Last Modified: 26/3/2025
 * Notes:
 */
@Service
public class RoleRouterValidator {
     private List<String> userEndpoints = List.of(
             "/api/v1"
     );

     private List<String> adminEndpoints = List.of(
             "/api/v1",
             "/api/v1/admin",
             "/api/v1/**/admin"
     );

     public boolean isUserEndpoint(String path) {
         return userEndpoints.stream().anyMatch(path::contains) && !path.contains("/admin/");
     }

     public boolean isAdminEndpoint(String path) {
         return adminEndpoints.stream().anyMatch(path::contains);
     }
}
