package swd392.chatbotservice.application.dto;

import lombok.Builder;
import lombok.Data;
import java.time.Instant;
import java.util.List;
import java.util.UUID;

@Data
@Builder
public class ChatHistoryResponse {

    private UUID id;

    private String sessionId;

    private String modelAlias;

    private Instant createdDate;

    private String chatTitle;

    private List<ChatItemResponse> histories;

}
