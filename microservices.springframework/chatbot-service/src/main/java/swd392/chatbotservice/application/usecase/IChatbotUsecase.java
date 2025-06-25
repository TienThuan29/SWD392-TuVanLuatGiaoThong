package swd392.chatbotservice.application.usecase;

import org.springframework.web.multipart.MultipartFile;

import swd392.chatbotservice.application.dto.ChatRequest;
import swd392.chatbotservice.application.dto.ResponseAi;

public interface IChatbotUsecase {

    // Generates content based on the provided prompt from Gemini.
    String generateContent(String prompt);

    ResponseAi generateContentFromPDF(String url, String prompt);

    ResponseAi generateContentFromPDF(MultipartFile url, String prompt) throws Exception;

    ResponseAi generateContentFromText(String prompt);

    ResponseAi generateContentFromRequest(ChatRequest request) throws Exception;
}
