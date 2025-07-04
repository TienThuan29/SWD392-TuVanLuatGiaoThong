package swd392.chatbotservice.application.mapper;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import swd392.chatbotservice.application.dto.ChatHistoryResponse;
import swd392.chatbotservice.application.dto.ChatItemResponse;
import swd392.chatbotservice.domain.entity.ChatHistory;
import swd392.chatbotservice.domain.entity.ChatItem;
import java.time.Instant;

@Component("chatHistoryMapper_ChatbotService")
@RequiredArgsConstructor
public class ChatHistoryMapper {

    public ChatHistoryResponse toResponse(ChatHistory chatHistory) {
        return ChatHistoryResponse.builder()
                .id(chatHistory.getId())
                .chatTitle(chatHistory.getChatTitle())
                .histories(chatHistory.getHistories().stream().map(
                        this::toChatItemResponse
                ).toList())
                .createdDate(chatHistory.getCreatedDate() != null ? Instant.parse(chatHistory.getCreatedDate()) : null)
                .build();
    }

    private ChatItemResponse toChatItemResponse(ChatItem chatItem) {
        return ChatItemResponse.builder()
                .userText(chatItem.getUserText())
                .botText(chatItem.getBotText())
                .createdDate(chatItem.getCreatedDate() != null ? Instant.parse(chatItem.getCreatedDate()) : null)
                .build();
    }

}
