package swd392.chatbotservice.application.usecase;

import org.springframework.web.multipart.MultipartFile;
import swd392.chatbotservice.application.dto.ChatHistoryResponse;
import swd392.chatbotservice.application.dto.ChatRequest;
import swd392.chatbotservice.application.dto.ResponseAi;
import swd392.chatbotservice.web.dto.UserPromptRequest;
import java.util.List;
import java.util.UUID;

public interface IChatbotUsecase {

    String generateContent(String prompt);

    ChatHistoryResponse generateWithAuthenticatedUser(UserPromptRequest userPromptRequest);

    List<ChatHistoryResponse> getAllChatHistoriesByUserId(String userId);

    ResponseAi generateContentFromPDF(String url, String prompt);

    ResponseAi generateContentFromPDF(MultipartFile url, String prompt) throws Exception;

    ResponseAi generateContentFromText(String prompt);

    ResponseAi generateContentFromRequest(ChatRequest request) throws Exception;
}
