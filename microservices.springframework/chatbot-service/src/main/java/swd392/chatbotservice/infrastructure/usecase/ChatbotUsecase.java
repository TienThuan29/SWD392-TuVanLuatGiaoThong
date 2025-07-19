package swd392.chatbotservice.infrastructure.usecase;

import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.util.List;
import java.util.Map;
import java.util.Random;
import java.util.UUID;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import swd392.chatbotservice.application.dto.ApiResponse;
import swd392.chatbotservice.application.dto.ChatHistoryResponse;
import swd392.chatbotservice.application.exception.CustomExceptions;
import swd392.chatbotservice.application.mapper.ChatHistoryMapper;
import swd392.chatbotservice.application.usecase.IChatbotUsecase;
import swd392.chatbotservice.domain.entity.ChatHistory;
import swd392.chatbotservice.domain.entity.ChatItem;
import swd392.chatbotservice.domain.repository.IChatbotRepository;
import swd392.chatbotservice.infrastructure.thirdparty.AIModelAlias;
import swd392.chatbotservice.infrastructure.thirdparty.IGeminiApi;
import swd392.chatbotservice.infrastructure.thirdparty.INenApi;
import swd392.chatbotservice.infrastructure.thirdparty.dto.GeminiTrafficResponse;
import swd392.chatbotservice.infrastructure.utils.IHashingUtil;
import swd392.chatbotservice.web.dto.UserPromptRequest;


@Service
@RequiredArgsConstructor
public class ChatbotUsecase implements IChatbotUsecase {

        private final IChatbotRepository chatbotRepository;

        private final IGeminiApi geminiApi;

        private final INenApi nenApi;

        private final ChatHistoryMapper chatHistoryMapper;

        private final IHashingUtil hashingUtil;

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
                                .dataResponse(Map.of("id", chatId.toString())) // return id of deleted chat history to delete from frontend
                                .build();
                }
                catch (Exception e) {
                        throw new CustomExceptions.InternalServerException("Có lỗi xảy ra khi xóa lịch sử trò chuyện: " + e.getMessage());
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
                }
                catch (Exception e) {
                        throw new CustomExceptions.InternalServerException(
                                "Có lỗi xảy ra khi đổi tên lịch sử trò chuyện: "
                                        + e.getMessage()
                        );
                }
        }

        @Override
        public ChatHistoryResponse generateWithAuthenticatedUser(UserPromptRequest userPromptRequest) {
                if (userPromptRequest.getModelAlias().equals(AIModelAlias.GEMINI_2_FLASH.alias) ||
                    userPromptRequest.getModelAlias().equals(AIModelAlias.GEMINI_2_5_FLASH.alias) ||
                    userPromptRequest.getModelAlias().equals(AIModelAlias.GEMINI_2_5_PRO.alias)
                ) {
                        return this.generateFromGemini(userPromptRequest);
                }
                else if (userPromptRequest.getModelAlias().equals(AIModelAlias.N8N_AGENT.alias)) {
                        return this.generateWithN8NAgent(userPromptRequest);
                }
                else {
                        throw new CustomExceptions.InternalServerException(
                                "Invalid model alias: " + userPromptRequest.getModelAlias()
                        );
                }
        }

        private ChatHistoryResponse generateWithN8NAgent(UserPromptRequest userPromptRequest) {
                ChatHistory savedChatHistory = null;
                var zoneId = ZoneId.of("Asia/Ho_Chi_Minh");

                if (userPromptRequest.getChatId() == null || userPromptRequest.getChatId().toString().isEmpty()) {
                        String newSessionId = this.generateRandomString(32);
                        String response = nenApi.generateNenResponse(
                                newSessionId,
                                userPromptRequest.getAction(),
                                userPromptRequest.getPrompt()
                        );

                        List<ChatItem> newHistories = List.of(
                                ChatItem.builder()
                                        .userText(userPromptRequest.getPrompt())
                                        .botText(response)
                                        .botSumerization("Not process")
                                        .createdDate(ZonedDateTime.now(zoneId).toInstant().toString())
                                        .build());

                        ChatHistory chatHistory = ChatHistory.builder()
                                .id(UUID.randomUUID())
                                .sessionId(newSessionId)
                                .modelAlias(userPromptRequest.getModelAlias())
                                .userId(UUID.fromString(
                                        hashingUtil.decode(userPromptRequest.getUserId())))
                                .chatTitle("")
                                .histories(newHistories)
                                .build();
                        savedChatHistory = chatHistory;
                        this.chatbotRepository.save(chatHistory);

                }
                else {
                        ChatHistory chatHistory = this.chatbotRepository.findById(userPromptRequest.getChatId());
                        if (chatHistory == null)
                                throw new CustomExceptions.ResourceNotFoundException(
                                        "Chat history not found with id: " + userPromptRequest.getChatId());
                        else {
                                // Update chat history
                                List<ChatItem> chatItems = chatHistory.getHistories();
                                // Call Gemini API to get the response with contexts history
                                String response = nenApi.generateNenResponse(userPromptRequest.getSessionId(),
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

        private ChatHistoryResponse generateFromGemini(UserPromptRequest userPromptRequest) {
                ChatHistory savedChatHistory = null;
                var zoneId = ZoneId.of("Asia/Ho_Chi_Minh");
                // 1. Begin a new chat, id = null
                if (userPromptRequest.getChatId() == null || userPromptRequest.getChatId().toString().isEmpty()) {
                        GeminiTrafficResponse geminiResponse = geminiApi.generateTrafficLawResponse(
                                userPromptRequest.getPrompt(), null, userPromptRequest.getModelAlias()
                        );
                        List<ChatItem> newHistories = List.of(
                                ChatItem.builder()
                                        .userText(userPromptRequest.getPrompt())
                                        .botText(geminiResponse.getFullAnswer())
                                        .botSumerization(geminiResponse.getSummarizeAnswer())
                                        .createdDate(ZonedDateTime.now(zoneId).toInstant().toString())
                                        .build()
                        );
                        ChatHistory chatHistory = ChatHistory.builder()
                                .id(UUID.randomUUID())
                                .userId(UUID.fromString(
                                        hashingUtil.decode(userPromptRequest.getUserId()))
                                )
                                .modelAlias(userPromptRequest.getModelAlias())
                                .chatTitle("")
                                .histories(newHistories)
                                .build();
                        savedChatHistory = chatHistory;
                        this.chatbotRepository.save(chatHistory);
                }
                // 2. Continue chat, id != null
                else {
                        ChatHistory chatHistory = this.chatbotRepository.findById(userPromptRequest.getChatId());
                        if (chatHistory == null)
                                throw new CustomExceptions.ResourceNotFoundException(
                                        "Chat history not found with id: " + userPromptRequest.getChatId()
                                );
                        else {
                                // Update chat history
                                List<ChatItem> chatItems = chatHistory.getHistories();
                                // Call Gemini API to get the response with contexts history
                                GeminiTrafficResponse geminiResponse = geminiApi.generateTrafficLawResponse(
                                        userPromptRequest.getPrompt(),
                                        chatHistory.getHistories().stream()
                                                .map(ChatItem::getBotSumerization).collect(Collectors.toList()),
                                        userPromptRequest.getModelAlias()
                                );
                                chatItems.add(
                                        ChatItem.builder()
                                                .userText(userPromptRequest.getPrompt())
                                                .botText(geminiResponse.getFullAnswer())
                                                .botSumerization(geminiResponse.getSummarizeAnswer())
                                                .createdDate(ZonedDateTime.now(zoneId).toInstant().toString())
                                                .build()
                                );
                                chatHistory.setHistories(chatItems);
                                savedChatHistory = chatHistory;
                                this.chatbotRepository.update(chatHistory);
                        }
                }

                return this.chatHistoryMapper.toResponse(savedChatHistory);
        }



        @Override
        public List<ChatHistoryResponse> getAllChatHistoriesByUserId(String userId) {
                String decodedUserId = this.hashingUtil.decode(userId);
                return this.chatbotRepository.findByUserId(UUID.fromString(decodedUserId))
                        .stream().map(chatHistoryMapper::toResponse).collect(Collectors.toList());
        }

        private String generateRandomString(int length) {
                String characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
                Random random = new Random();
                StringBuilder sb = new StringBuilder(length);

                for (int i = 0; i < length; i++) {
                        int index = random.nextInt(characters.length());
                        sb.append(characters.charAt(index));
                }

                return sb.toString();
        }
}
