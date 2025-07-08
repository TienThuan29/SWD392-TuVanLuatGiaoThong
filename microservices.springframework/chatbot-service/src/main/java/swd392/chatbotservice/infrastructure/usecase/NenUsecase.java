package swd392.chatbotservice.infrastructure.usecase;

import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import swd392.chatbotservice.application.dto.ApiResponse;
import swd392.chatbotservice.application.dto.ChatHistoryResponse;
import swd392.chatbotservice.application.exception.CustomExceptions;
import swd392.chatbotservice.application.mapper.ChatHistoryMapper;
import swd392.chatbotservice.application.usecase.INenUsecase;
import swd392.chatbotservice.domain.entity.ChatHistory;
import swd392.chatbotservice.domain.entity.ChatItem;
import swd392.chatbotservice.domain.repository.ChatbotRepository;
import swd392.chatbotservice.infrastructure.thirdparty.NenApi;
import swd392.chatbotservice.infrastructure.utils.HashingUtil;
import swd392.chatbotservice.web.dto.NenRequest;

@Service
@RequiredArgsConstructor
public class NenUsecase implements INenUsecase {

    private final NenApi nenApi;

    private final ChatbotRepository chatbotRepository;

    private final HashingUtil hashingUtil;

    private final ChatHistoryMapper chatHistoryMapper;

    @Override
    public ChatHistoryResponse generateWithAuthenticatedUser(NenRequest userPromptRequest) {
        ChatHistory savedChatHistory = null;
        var zoneId = ZoneId.of("Asia/Ho_Chi_Minh");

        if (userPromptRequest.getChatId() == null || userPromptRequest.getChatId().toString().isEmpty()) {
            String response = nenApi.generatNenResponse(userPromptRequest.getSessionId(),
                    userPromptRequest.getAction(), userPromptRequest.getPrompt());

            List<ChatItem> newHistories = List.of(
                    ChatItem.builder()
                            .userText(userPromptRequest.getPrompt())
                            .botText(response)
                            .botSumerization("Not process")
                            .createdDate(ZonedDateTime.now(zoneId).toInstant().toString())
                            .build());

            ChatHistory chatHistory = ChatHistory.builder()
                    .id(UUID.randomUUID())
                    .userId(UUID.fromString(
                            hashingUtil.decode(userPromptRequest.getUserId())))
                    .chatTitle("")
                    .histories(newHistories)
                    .build();
            savedChatHistory = chatHistory;
            this.chatbotRepository.save(chatHistory);

        } else {
            ChatHistory chatHistory = this.chatbotRepository.findById(userPromptRequest.getChatId());
            if (chatHistory == null)
                throw new CustomExceptions.ResourceNotFoundException(
                        "Chat history not found with id: " + userPromptRequest.getChatId());
            else {
                // Update chat history
                List<ChatItem> chatItems = chatHistory.getHistories();
                // Call Gemini API to get the response with contexts history
                String response = nenApi.generatNenResponse(userPromptRequest.getSessionId(),
                        userPromptRequest.getAction(), userPromptRequest.getPrompt());

                chatItems.add(
                        ChatItem.builder()
                                .userText(userPromptRequest.getPrompt())
                                .botText(response)
                                .botSumerization("Not process")
                                .createdDate(ZonedDateTime.now(zoneId).toInstant().toString())
                                .build());
                chatHistory.setHistories(chatItems);
                savedChatHistory = chatHistory;
                this.chatbotRepository.update(chatHistory);
            }
        }

        return this.chatHistoryMapper.toResponse(savedChatHistory);
    }

    @Override
    public ApiResponse<Map<String, String>> deleteChatHistory(UUID chatId) {
        try {
            ChatHistory chatHistory = this.chatbotRepository.findById(chatId);
            if (chatHistory == null)
                throw new CustomExceptions.ResourceNotFoundException("Chat history not found with id: " + chatId);

            this.chatbotRepository.delete(chatHistory);
            return ApiResponse.<Map<String, String>>builder()
                    .status("success")
                    .message("Xóa lịch sử trò chuyện thành công!")
                    .dataResponse(Map.of("id", chatId.toString())) // return id of deleted chat history to delete from
                                                                   // frontend
                    .build();
        } catch (Exception e) {
            throw new CustomExceptions.InternalServerException(
                    "Có lỗi xảy ra khi xóa lịch sử trò chuyện: " + e.getMessage());
        }
    }

    @Override
    public ApiResponse<ChatHistoryResponse> renameChatTitle(String chatId, String newTitle) {
        try {
            ChatHistory chatHistory = this.chatbotRepository.findById(UUID.fromString(chatId));
            chatHistory.setChatTitle(newTitle);
            this.chatbotRepository.save(chatHistory);
            return ApiResponse.<ChatHistoryResponse>builder()
                    .status("success")
                    .message("Đổi tên lịch sử trò chuyện thành công!")
                    .dataResponse(chatHistoryMapper.toResponse(chatHistory))
                    .build();
        } catch (Exception e) {
            throw new CustomExceptions.InternalServerException(
                    "Có lỗi xảy ra khi đổi tên lịch sử trò chuyện: "
                            + e.getMessage());
        }
    }

    @Override
    public List<ChatHistoryResponse> getAllChatHistoriesByUserId(String userId) {
        String decodedUserId = this.hashingUtil.decode(userId);
        return this.chatbotRepository.findByUserId(UUID.fromString(decodedUserId))
                .stream().map(chatHistoryMapper::toResponse).collect(Collectors.toList());
    }

}
