package swd392.chatbotservice.application.usecase;


import java.util.List;
import java.util.Map;
import java.util.UUID;

import swd392.chatbotservice.application.dto.ApiResponse;
import swd392.chatbotservice.application.dto.ChatHistoryResponse;
import swd392.chatbotservice.web.dto.NenRequest;

public interface INenUsecase {
    ChatHistoryResponse generateWithAuthenticatedUser(NenRequest request);
    ApiResponse<Map<String, String>> deleteChatHistory(UUID chatId);
    ApiResponse<ChatHistoryResponse> renameChatTitle(String chatId, String newTitle);
    List<ChatHistoryResponse> getAllChatHistoriesByUserId(String userId);
}
