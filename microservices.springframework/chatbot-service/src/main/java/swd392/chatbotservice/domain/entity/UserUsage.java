package swd392.chatbotservice.domain.entity;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.io.Serializable;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserUsage implements Serializable {

    private static final long serialVersionUID = 1L;

    @JsonProperty("userUsage")
    private int userUsage;
    @JsonProperty("dailyUsage")
    private int dailyUsage;

    public boolean canUse() {
        return userUsage < dailyUsage;
    }

    public int getRemainingUsage() {
        return Math.max(0, dailyUsage - userUsage);
    }
}
