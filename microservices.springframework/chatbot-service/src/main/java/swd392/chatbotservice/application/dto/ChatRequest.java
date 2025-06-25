package swd392.chatbotservice.application.dto;

import org.springframework.web.multipart.MultipartFile;

public class ChatRequest {

    private String prompt;
    private MultipartFile pdfFile;

    // Getter and Setter
    public String getPrompt() {
        return prompt;
    }

    public void setPrompt(String prompt) {
        this.prompt = prompt;
    }

    public MultipartFile getPdfFile() {
        return pdfFile;
    }

    public void setPdfFile(MultipartFile pdfFile) {
        this.pdfFile = pdfFile;
    }

    public ChatRequest() {
    }

    public ChatRequest(String prompt, MultipartFile pdfFile) {
        this.prompt = prompt;
        this.pdfFile = pdfFile;
    }
}
