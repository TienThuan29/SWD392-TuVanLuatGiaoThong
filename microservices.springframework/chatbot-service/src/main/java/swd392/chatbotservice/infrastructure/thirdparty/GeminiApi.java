package swd392.chatbotservice.infrastructure.thirdparty;

import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.ai.vertexai.gemini.VertexAiGeminiChatModel;
import org.springframework.http.HttpEntity;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import swd392.chatbotservice.infrastructure.configuration.ChatbotConfiguration;
import swd392.chatbotservice.infrastructure.thirdparty.dto.GeminiResponse;
import org.springframework.http.HttpHeaders;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class GeminiApi {

    private final ChatbotConfiguration config;

    private final VertexAiGeminiChatModel chatModel;

    private final ObjectMapper objectMapper = new ObjectMapper();

    private final String ENDPOINT = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=";

    public GeminiResponse generateContentAsObject(String prompt) {
        try {
            RestTemplate restTemplate = new RestTemplate();
            String endpoint = this.ENDPOINT + config.getApiKey();
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            Map<String, Object> content = Map.of("parts", List.of(Map.of("text", prompt)));
            Map<String, Object> body = Map.of("contents", List.of(content));
            HttpEntity<Map<String, Object>> request = new HttpEntity<>(body, headers);
            ResponseEntity<GeminiResponse> response = restTemplate.postForEntity(
                    endpoint, request, GeminiResponse.class);
            return response.getBody();

        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    // Content text only
    public String getTextContentOnly(String prompt) {
        GeminiResponse response = generateContentAsObject(prompt);
        return response != null ? response.getTextContent() : null;
    }

}
