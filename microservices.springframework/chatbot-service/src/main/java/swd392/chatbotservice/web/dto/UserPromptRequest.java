package swd392.chatbotservice.web.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import java.util.UUID;

@Data
public class UserPromptRequest {

    UUID chatId;

    @NotBlank(message = "User ID cannot be blank")
    String userId;

    @NotBlank(message = "Prompt cannot be blank")
    String prompt;

    String sessionId;

    @NotBlank(message = "You must specify a model alias")
    String modelAlias;

    String action = "sendMessage";

}
