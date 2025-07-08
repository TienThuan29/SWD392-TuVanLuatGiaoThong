package swd392.chatbotservice.web.dto;

import java.util.UUID;

import lombok.Data;
@Data
public class NenRequest {
    UUID chatId;

    String userId;

    String prompt;
    
    String sessionId;
    
    String action = "sendMessage";
}
