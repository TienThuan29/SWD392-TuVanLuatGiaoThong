package swd392.chatbotservice.infrastructure.usecase;

import java.util.List;
import java.util.Map;

import org.springframework.ai.chat.messages.UserMessage;
import org.springframework.ai.chat.prompt.Prompt;
import org.springframework.ai.content.Media;
import org.springframework.ai.vertexai.gemini.VertexAiGeminiChatModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.MimeType;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

import swd392.chatbotservice.application.dto.ChatRequest;
import swd392.chatbotservice.application.dto.ResponseAi;
import swd392.chatbotservice.application.usecase.IChatbotUsecase;
import swd392.chatbotservice.infrastructure.configuration.ChatbotConfiguration;

@Service
public class ChatbotUsecase implements IChatbotUsecase {

        @Autowired
        private ChatbotConfiguration config;

        @Autowired
        private VertexAiGeminiChatModel chatModel;

        @Override
        public String generateContent(String prompt) {

                RestTemplate restTemplate = new RestTemplate();

                String endpoint = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key="
                                + config.getApiKey();

                // Set up headers - tạo đối tượng HttpHeaders để cấu hình
                HttpHeaders headers = new HttpHeaders();

                // Cho biết loại dữ liệu sẽ nhận - cụ thể ở đây là JSON
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
        public ResponseAi generateContentFromPDF(String pdfUrl, String prompt) {

                var pdfData = new ClassPathResource(pdfUrl);

                var userMessage = UserMessage.builder()
                                .text(prompt)
                                .media(List.of(new Media(new MimeType("application", "pdf"), pdfData)))
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
