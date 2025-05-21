package swd392.apigatewayservice.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;

/*
 * File: ApiResponse.java
 * Description: Response object for API calls.
 *
 * Version History:
 * ----------------------------------------------------------------------------
 * v1.0 - ?/2/2025 - Nguyen Tien Thuan - Define class.
 * ----------------------------------------------------------------------------
 *
 * Author(s): Nguyen Tien Thuan
 * Last Modified: 26/3/2025
 * Notes:
 */
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ApiResponse<T> {
    @JsonProperty("status")
    public String status;

    @JsonProperty("message")
    public String message;

    @JsonProperty("dataResponse")
    public T dataResponse;
}


