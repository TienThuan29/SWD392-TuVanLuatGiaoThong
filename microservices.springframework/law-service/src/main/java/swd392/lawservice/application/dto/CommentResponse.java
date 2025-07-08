package swd392.lawservice.application.dto;

import lombok.Data;

import java.time.LocalDateTime;
import java.util.UUID;

@Data
public class CommentResponse {
    private UUID id = UUID.randomUUID();
    private String userName;
    private String content;
    private int rating;
    private LocalDateTime createdDate;
    private LocalDateTime updatedDate;
}
