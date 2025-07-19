package swd392.lawservice.web.dto;

import lombok.Data;
import java.util.UUID;

@Data
public class CommentUpdateRequest {
    private UUID id;
    private String content;
    private int rating;
}
