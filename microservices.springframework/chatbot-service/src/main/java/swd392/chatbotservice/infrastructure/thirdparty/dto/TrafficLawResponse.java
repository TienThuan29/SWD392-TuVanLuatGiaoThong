package swd392.chatbotservice.infrastructure.thirdparty.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;

@Getter
public class TrafficLawResponse {
    @JsonProperty("summarize_answer")
    private String summarizeAnswer;

    @JsonProperty("full_answer")
    private String fullAnswer;

    public TrafficLawResponse() {}

    public TrafficLawResponse(String summarizeAnswer, String fullAnswer) {
        this.summarizeAnswer = summarizeAnswer;
        this.fullAnswer = fullAnswer;
    }

    public void setSummarizeAnswer(String summarizeAnswer) {
        this.summarizeAnswer = summarizeAnswer;
    }

    public void setFullAnswer(String fullAnswer) {
        this.fullAnswer = fullAnswer;
    }

    @Override
    public String toString() {
        return "TrafficLawResponse{" +
                "summarizeAnswer='" + summarizeAnswer + '\'' +
                ", fullAnswer='" + fullAnswer + '\'' +
                '}';
    }
}
