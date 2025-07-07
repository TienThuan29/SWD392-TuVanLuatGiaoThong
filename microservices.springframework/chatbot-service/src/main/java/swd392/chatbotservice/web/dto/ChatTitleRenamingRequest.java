package swd392.chatbotservice.web.dto;

import lombok.Data;

import java.util.UUID;

@Data
public class ChatTitleRenamingRequest {

    UUID chatId;

    String newTitle;

}
