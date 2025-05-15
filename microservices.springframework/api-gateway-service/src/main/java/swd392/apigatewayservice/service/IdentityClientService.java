package swd392.apigatewayservice.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import swd392.apigatewayservice.adapter.IdentityClient;
import swd392.apigatewayservice.dto.ApiResponse;
import java.util.List;

@Service
public class IdentityClientService {

    @Autowired
    private IdentityClient identityClient;

    /**
     * Call identity service to authenticate token from IdentityClient
     * @param token token to authenticate
     * @return ApiResponse<List<String>> response from identity service
     * List<String> contains roles of the user
     */
    public ApiResponse<List<String>> authenticateToken(String token) {
        return identityClient.authenticateToken(token);
    }

}
