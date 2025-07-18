package swd392.chatbotservice.application.usecase;

import swd392.chatbotservice.application.dto.ApiResponse;
import swd392.chatbotservice.application.dto.ChatHistoryResponse;
import swd392.chatbotservice.web.dto.UserPromptRequest;
import java.util.List;
import java.util.Map;
import java.util.UUID;

public interface IChatbotUsecase {

    ApiResponse<Map<String, String>> deleteChatHistory(UUID chatId);

    ApiResponse<ChatHistoryResponse> renameChatTitle(String chatId, String newTitle);

    ChatHistoryResponse generateWithAuthenticatedUser(UserPromptRequest userPromptRequest);

    List<ChatHistoryResponse> getAllChatHistoriesByUserId(String userId);


}
