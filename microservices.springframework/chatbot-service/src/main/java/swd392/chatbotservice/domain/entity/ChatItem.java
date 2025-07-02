package swd392.chatbotservice.domain.entity;

import com.fasterxml.jackson.annotation.JsonProperty;
import java.time.Instant;
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

    @JsonProperty("created_date")
    private String createdDate;

}
