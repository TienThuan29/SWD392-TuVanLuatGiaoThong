package swd392.chatbotservice.application.usecase;

import org.springframework.web.multipart.MultipartFile;
import swd392.chatbotservice.application.dto.ChatRequest;
import swd392.chatbotservice.application.dto.ResponseAi;
import swd392.chatbotservice.domain.entity.ChatHistory;
import swd392.chatbotservice.web.dto.UserPromptRequest;

public interface IChatbotUsecase {

    // Generates content based on the provided prompt from Gemini.
    String generateContent(String prompt);

    ChatHistory generateWithAuthenticatedUser(UserPromptRequest userPromptRequest);

    ResponseAi generateContentFromPDF(String url, String prompt);

    ResponseAi generateContentFromPDF(MultipartFile url, String prompt) throws Exception;

    ResponseAi generateContentFromText(String prompt);

    ResponseAi generateContentFromRequest(ChatRequest request) throws Exception;
}
