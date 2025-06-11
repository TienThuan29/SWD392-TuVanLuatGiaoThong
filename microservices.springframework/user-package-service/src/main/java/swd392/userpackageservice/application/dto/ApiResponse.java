package swd392.userpackageservice.application.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ApiResponse<T> {
    private String status;
    private String message;
    private T dataResponse;
}
