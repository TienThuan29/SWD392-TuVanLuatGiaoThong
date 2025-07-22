package swd392.userpackageservice.web.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class AIModelRequest {

    @NotBlank(message = "Model name is required")
    @Size(min = 1, max = 80, message = "Model name must be between 1 and 80 characters")
    String modelName;

    @NotBlank(message = "Provider is required")
    @Size(min = 1, max = 80, message = "Provider must be between 1 and 80 characters")
    String provider;

    @NotBlank(message = "Alias is required")
    @Size(min = 1, max = 80, message = "Alias must be between 1 and 80 characters")
    String alias;

    @NotBlank(message = "Description is required")
    String description;
}
