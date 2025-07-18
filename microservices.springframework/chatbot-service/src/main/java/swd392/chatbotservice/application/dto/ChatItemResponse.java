package swd392.chatbotservice.application.dto;

import lombok.Builder;
import lombok.Data;
import java.time.Instant;

@Data
@Builder
public class ChatItemResponse {

    private String userText;

    private String botText;

    private Instant createdDate;

}
