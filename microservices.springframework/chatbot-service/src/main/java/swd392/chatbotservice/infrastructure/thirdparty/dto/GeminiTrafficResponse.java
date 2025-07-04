package swd392.chatbotservice.infrastructure.thirdparty.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
public class GeminiTrafficResponse {

    private TrafficLawResponse trafficLawData;
    @Setter
    private GeminiResponse rawGeminiResponse;
    private boolean isValidJson;
    @Setter
    private String errorMessage;

    public GeminiTrafficResponse() {}

    public GeminiTrafficResponse(TrafficLawResponse trafficLawData, GeminiResponse rawGeminiResponse) {
        this.trafficLawData = trafficLawData;
        this.rawGeminiResponse = rawGeminiResponse;
        this.isValidJson = (trafficLawData != null);
    }

    public void setTrafficLawData(TrafficLawResponse trafficLawData) {
        this.trafficLawData = trafficLawData;
        this.isValidJson = (trafficLawData != null);
    }

    public void setValidJson(boolean validJson) {
        isValidJson = validJson;
    }

    public String getSummarizeAnswer() {
        return trafficLawData != null ? trafficLawData.getSummarizeAnswer() : null;
    }

    public String getFullAnswer() {
        return trafficLawData != null ? trafficLawData.getFullAnswer() : null;
    }

    public Integer getTotalTokenCount() {
        return rawGeminiResponse != null && rawGeminiResponse.getUsageMetadata() != null
                ? rawGeminiResponse.getUsageMetadata().getTotalTokenCount() : null;
    }

    public String getModelVersion() {
        return rawGeminiResponse != null ? rawGeminiResponse.getModelVersion() : null;
    }
}
