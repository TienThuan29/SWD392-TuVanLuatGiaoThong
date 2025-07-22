package swd392.chatbotservice.web.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;
import java.util.UUID;

@Data
public class ChatTitleRenamingRequest {

    @NotBlank(message = "Chat ID cannot be blank")
    UUID chatId;

    @NotBlank(message = "New title cannot be blank")
    @Size(min = 1, max = 100, message = "New title must be between 1 and 100 characters")
    String newTitle;

}
