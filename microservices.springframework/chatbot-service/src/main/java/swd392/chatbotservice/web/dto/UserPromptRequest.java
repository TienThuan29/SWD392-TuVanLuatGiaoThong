package swd392.chatbotservice.web.dto;

import lombok.Data;

import java.util.UUID;

@Data
public class UserPromptRequest {

    UUID chatId;

    UUID userId;

    String prompt;

}
