package swd392.chatbotservice.infrastructure.thirdparty.dto;

import java.time.Instant;
import java.util.List;
import java.util.UUID;

import lombok.Data;
import swd392.chatbotservice.application.dto.ChatItemResponse;

@Data
public class NenResponse {
    UUID id;
    Instant createdDate;
    String chatTitle;
    List<ChatItemResponse> histories;
    String sessionId;
    String action;
}
