package swd392.chatbotservice.infrastructure.usecase;

import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.stream.Collectors;

import lombok.RequiredArgsConstructor;
import org.springframework.ai.chat.messages.UserMessage;
import org.springframework.ai.chat.prompt.Prompt;
import org.springframework.ai.content.Media;
import org.springframework.ai.vertexai.gemini.VertexAiGeminiChatModel;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.MimeType;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;
import swd392.chatbotservice.application.dto.ChatHistoryResponse;
import swd392.chatbotservice.application.dto.ChatRequest;
import swd392.chatbotservice.application.dto.ResponseAi;
import swd392.chatbotservice.application.exception.CustomExceptions;
import swd392.chatbotservice.application.mapper.ChatHistoryMapper;
import swd392.chatbotservice.application.usecase.IChatbotUsecase;
import swd392.chatbotservice.domain.entity.ChatHistory;
import swd392.chatbotservice.domain.entity.ChatItem;
import swd392.chatbotservice.domain.repository.IChatbotRepository;
import swd392.chatbotservice.infrastructure.configuration.ChatbotConfiguration;
import swd392.chatbotservice.infrastructure.thirdparty.GeminiApi;
import swd392.chatbotservice.web.dto.UserPromptRequest;


@Service
@RequiredArgsConstructor
public class ChatbotUsecase implements IChatbotUsecase {

        private final ChatbotConfiguration config;

        private final VertexAiGeminiChatModel chatModel;

        private final IChatbotRepository chatbotRepository;

        private final GeminiApi geminiApi;

        private final ChatHistoryMapper chatHistoryMapper;

        @Override
        public final String generateContent(String prompt) {
                RestTemplate restTemplate = new RestTemplate();
                String endpoint = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key="
                                + config.getApiKey();
                HttpHeaders headers = new HttpHeaders();
                headers.setContentType(MediaType.APPLICATION_JSON);

                // Construct request body - tạo cấu trúc body
                Map<String, Object> content = Map.of("parts", List.of(Map.of("text", prompt)));
                Map<String, Object> body = Map.of("contents", List.of(content));

                // Tạo đối tượng HttpEntity để chứa body và headers
                HttpEntity<Map<String, Object>> request = new HttpEntity<>(body, headers);

                // Đóng gói lại và gửi đi - sử dụng RestTemplate để gửi yêu cầu POST
                ResponseEntity<String> response = restTemplate.postForEntity(endpoint, request, String.class);

                return response.getBody();

        }

        @Override
        public ChatHistoryResponse generateWithAuthenticatedUser(UserPromptRequest userPromptRequest) {
                var generatedContent = this.geminiApi.getTextContentOnly(userPromptRequest.getPrompt());
                // 1. Begin a new chat, id = null
                var zoneId = ZoneId.of("Asia/Ho_Chi_Minh");
                ChatHistory chatHistory = null;
                if (userPromptRequest.getChatId() == null || userPromptRequest.getChatId().toString().isEmpty()) {
                        List<ChatItem> newHistories = List.of(
                                ChatItem.builder()
                                        .userText(userPromptRequest.getPrompt())
                                        .botText(generatedContent)
                                        .createdDate(ZonedDateTime.now(zoneId).toInstant().toString())
                                        .build()
                        );
                        chatHistory = ChatHistory.builder()
                                .id(UUID.randomUUID())
                                .userId(userPromptRequest.getUserId())
                                .chatTitle("New Chat")
                                .histories(newHistories)
                                .build();
                        this.chatbotRepository.save(chatHistory);
                }
                // 2. Continue chat, id != null
                else {
                        chatHistory = this.chatbotRepository.findById(userPromptRequest.getChatId());
                        if (chatHistory == null)
                                throw new CustomExceptions.ResourceNotFoundException(
                                        "Chat history not found with id: " + userPromptRequest.getChatId()
                                );
                        else {
                                // Update chat history
                                List<ChatItem> updatedHistories = chatHistory.getHistories();
                                updatedHistories.add(
                                        ChatItem.builder()
                                                .userText(userPromptRequest.getPrompt())
                                                .botText(generatedContent)
                                                .createdDate(ZonedDateTime.now(zoneId).toInstant().toString())
                                                .build()
                                );
                                chatHistory.setHistories(updatedHistories);
                                this.chatbotRepository.update(chatHistory);
                        }
                }

                return this.chatHistoryMapper.toResponse(chatHistory);
        }

        @Override
        public List<ChatHistoryResponse> getAllChatHistoriesByUserId(UUID userId) {
                return this.chatbotRepository.findByUserId(userId)
                        .stream().map(chatHistoryMapper::toResponse).collect(Collectors.toList());
        }

        public ResponseAi generateContentFromPDF(String prompt) {
                var userMessage = UserMessage.builder()
                        .text(prompt)
                        .build();
                var aiResponse = this.chatModel.call(new Prompt(List.of(userMessage)));
                return new ResponseAi(prompt, aiResponse.getResult().getOutput().getText());
        }

        @Override
        public ResponseAi generateContentFromPDF(String pdfUrl, String prompt) {

                //var pdfData = new ClassPathResource(pdfUrl);

                var userMessage = UserMessage.builder()
                                .text(prompt)
                                //.media(List.of(new Media(new MimeType("application", "pdf"), pdfData)))
                                .build();

                var aiResponse = this.chatModel.call(new Prompt(List.of(userMessage)));

                return new ResponseAi(prompt, aiResponse.getResult().getOutput().getText());
        }

        @Override
        public ResponseAi generateContentFromPDF(MultipartFile pdfUrl, String prompt) throws Exception {

                var pdfData = new InputStreamResource(pdfUrl.getInputStream());

                var userMessage = UserMessage.builder()
                                .text(prompt)
                                .media(List.of(new Media(new MimeType("application", "pdf"), pdfData)))
                                .build();

                var aiResponse = this.chatModel.call(new Prompt(List.of(userMessage)));

//                return new ResponseAi(prompt, aiResponse.getResult().getOutput().getText());
                return new ResponseAi(prompt, aiResponse.toString());
        }

        @Override
        public ResponseAi generateContentFromText(String prompt) {
                var userMessage = UserMessage.builder()
                                .text(prompt)
                                .build();

                var aiResponse = this.chatModel.call(new Prompt(List.of(userMessage)));

                return new ResponseAi(prompt, aiResponse.getResult().getOutput().getText());
        }

        @Override
        public ResponseAi generateContentFromRequest(ChatRequest chatRequest) throws Exception {
                if (chatRequest.getPdfFile() != null) {
                        return generateContentFromPDF(chatRequest.getPdfFile(), chatRequest.getPrompt());
                } else if (chatRequest.getPrompt() != null) {
                        return generateContentFromText(chatRequest.getPrompt());
                }
                return new ResponseAi("Invalid input", "No valid content provided.");
        }
}
