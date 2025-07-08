package swd392.lawservice.web.dto;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

import java.util.UUID;

@Data
public class CommentCreateRequest {
    private UUID id;
    private String userName;

    @NotBlank
    private String content;

    @Min(1)
    @Max(5)
    private int rating;

}
