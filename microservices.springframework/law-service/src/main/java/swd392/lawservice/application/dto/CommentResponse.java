package swd392.lawservice.application.dto;

import lombok.Data;
import java.time.Instant;
import java.util.UUID;

@Data
public class CommentResponse {
    private UUID id;
    private String username;
    private String fullname;
    private String avatarUrl;
    private boolean isAnonymous;
    private String content;
    private int rating;
    private Instant createdDate;
    private Instant updatedDate;
}
