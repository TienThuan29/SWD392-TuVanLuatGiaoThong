package swd392.chatbotservice.domain.entity;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ChatItem {
    
    @JsonProperty("user_text")
    private String userText;

    @JsonProperty("bot_text")
    private String botText;

    @JsonProperty("bot_sumerization")
    private String botSumerization;

    @JsonProperty("created_date")
    private String createdDate;

}
