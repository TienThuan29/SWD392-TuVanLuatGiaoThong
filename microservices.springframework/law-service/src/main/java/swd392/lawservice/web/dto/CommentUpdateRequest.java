package swd392.lawservice.web.dto;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;
import java.util.UUID;

@Data
public class CommentUpdateRequest {
    @NotBlank(message = "ID is required")
    private UUID id;

    @Size(min = 0, max = 512, message = "Content must be less than 512 characters")
    private String content;

    @Min(1)
    @Max(5)
    private int rating;
}
