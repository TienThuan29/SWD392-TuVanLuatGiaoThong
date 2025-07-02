package swd392.chatbotservice.infrastructure.thirdparty.dto;

import java.util.List;

public class UsageMetadata {
    private Integer promptTokenCount;
    private Integer candidatesTokenCount;
    private Integer totalTokenCount;
    private List<TokenDetails> promptTokensDetails;
    private List<TokenDetails> candidatesTokensDetails;

    public UsageMetadata() {}

    public UsageMetadata(Integer promptTokenCount, Integer candidatesTokenCount,
                         Integer totalTokenCount, List<TokenDetails> promptTokensDetails,
                         List<TokenDetails> candidatesTokensDetails) {
        this.promptTokenCount = promptTokenCount;
        this.candidatesTokenCount = candidatesTokenCount;
        this.totalTokenCount = totalTokenCount;
        this.promptTokensDetails = promptTokensDetails;
        this.candidatesTokensDetails = candidatesTokensDetails;
    }

    public Integer getPromptTokenCount() {
        return promptTokenCount;
    }

    public void setPromptTokenCount(Integer promptTokenCount) {
        this.promptTokenCount = promptTokenCount;
    }

    public Integer getCandidatesTokenCount() {
        return candidatesTokenCount;
    }

    public void setCandidatesTokenCount(Integer candidatesTokenCount) {
        this.candidatesTokenCount = candidatesTokenCount;
    }

    public Integer getTotalTokenCount() {
        return totalTokenCount;
    }

    public void setTotalTokenCount(Integer totalTokenCount) {
        this.totalTokenCount = totalTokenCount;
    }

    public List<TokenDetails> getPromptTokensDetails() {
        return promptTokensDetails;
    }

    public void setPromptTokensDetails(List<TokenDetails> promptTokensDetails) {
        this.promptTokensDetails = promptTokensDetails;
    }

    public List<TokenDetails> getCandidatesTokensDetails() {
        return candidatesTokensDetails;
    }

    public void setCandidatesTokensDetails(List<TokenDetails> candidatesTokensDetails) {
        this.candidatesTokensDetails = candidatesTokensDetails;
    }
}
