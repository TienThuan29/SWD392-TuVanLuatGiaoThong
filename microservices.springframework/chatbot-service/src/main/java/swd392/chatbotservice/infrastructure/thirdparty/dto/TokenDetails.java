package swd392.chatbotservice.infrastructure.thirdparty.dto;

public class TokenDetails {
    private String modality;
    private Integer tokenCount;

    public TokenDetails() {}

    public TokenDetails(String modality, Integer tokenCount) {
        this.modality = modality;
        this.tokenCount = tokenCount;
    }

    public String getModality() {
        return modality;
    }

    public void setModality(String modality) {
        this.modality = modality;
    }

    public Integer getTokenCount() {
        return tokenCount;
    }

    public void setTokenCount(Integer tokenCount) {
        this.tokenCount = tokenCount;
    }
}
