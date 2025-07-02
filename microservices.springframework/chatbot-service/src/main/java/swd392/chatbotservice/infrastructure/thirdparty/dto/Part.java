package swd392.chatbotservice.infrastructure.thirdparty.dto;

public class Part {
    private String text;

    // Constructors
    public Part() {}

    public Part(String text) {
        this.text = text;
    }

    // Getters and Setters
    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }
}
