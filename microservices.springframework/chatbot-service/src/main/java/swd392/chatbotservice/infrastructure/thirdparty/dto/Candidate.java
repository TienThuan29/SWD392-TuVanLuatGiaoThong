package swd392.chatbotservice.infrastructure.thirdparty.dto;

public class Candidate {
    private Content content;
    private String finishReason;
    private Double avgLogprobs;

    public Candidate() {}

    public Candidate(Content content, String finishReason, Double avgLogprobs) {
        this.content = content;
        this.finishReason = finishReason;
        this.avgLogprobs = avgLogprobs;
    }

    public Content getContent() {
        return content;
    }

    public void setContent(Content content) {
        this.content = content;
    }

    public String getFinishReason() {
        return finishReason;
    }

    public void setFinishReason(String finishReason) {
        this.finishReason = finishReason;
    }

    public Double getAvgLogprobs() {
        return avgLogprobs;
    }

    public void setAvgLogprobs(Double avgLogprobs) {
        this.avgLogprobs = avgLogprobs;
    }
}
