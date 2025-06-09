package swd392.chatbotservice.application.dto;

public class ResponseAi {
    
    private String prompt;
    private String response;

    public ResponseAi() {
    }

    public ResponseAi(String prompt, String response) {
        this.prompt = prompt;
        this.response = response;
    }

    public String getPrompt() {
        return prompt;
    }

    public void setPrompt(String prompt) {
        this.prompt = prompt;
    }

    public String getResponse() {
        return response;
    }

    public void setResponse(String response) {
        this.response = response;
    }
}
