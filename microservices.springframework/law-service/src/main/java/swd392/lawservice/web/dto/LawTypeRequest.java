package swd392.lawservice.web.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;
import java.util.UUID;

@Data
public class LawTypeRequest {

    @NotBlank(message = "Name is required")
    private UUID id;

    @NotBlank(message = "Name is required")
    @Size(min = 1, max = 100, message = "Name must be less than 100 characters")
    private String name;

}
