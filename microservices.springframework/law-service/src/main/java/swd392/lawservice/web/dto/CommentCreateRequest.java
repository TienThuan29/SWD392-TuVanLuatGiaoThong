package swd392.lawservice.web.dto;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class CommentCreateRequest {

    @NotBlank(message = "Username is required")
    String username;

    @NotBlank(message = "Full name is required")
    String fullname;

    String avatarUrl;
    Boolean isAnonymous;

    @NotBlank
    String content;

    @Min(1)
    @Max(5)
    int rating;
}
