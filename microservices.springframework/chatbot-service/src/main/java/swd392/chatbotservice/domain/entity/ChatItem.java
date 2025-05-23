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

    @JsonProperty("date_instant")
    private Instant dateInstant;

    @JsonProperty("is_deleted")
    private Boolean isDeleted;

    @JsonProperty("created_date")
    private Instant createdDate;

}
