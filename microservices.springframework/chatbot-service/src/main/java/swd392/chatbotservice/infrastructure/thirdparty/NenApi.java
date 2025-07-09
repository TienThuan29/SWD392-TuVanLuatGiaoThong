package swd392.chatbotservice.infrastructure.thirdparty;

import java.util.Random;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class NenApi {
    public String generatNenResponse(String sessionId, String action, String chatInput) {

        String apiNen = "https://tienthuan29.app.n8n.cloud/webhook/4840344c-3693-4f86-9ba7-c5a284741ca2/chat";

        try {
            RestTemplate restTemplate = new RestTemplate();

            if (sessionId == null || sessionId.isEmpty()) {
                sessionId = generateRandomString(32); // Default session ID
            }

            String requestBody = "{\n" +
                    "  \"sessionId\": \"" + sessionId + "\",\n" +
                    "  \"action\": \"" + action + "\",\n" +
                    "  \"chatInput\": \"" + chatInput + "\"\n" +
                    "}";


            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            HttpEntity<String> entity = new HttpEntity<>(requestBody, headers);
            ResponseEntity<String> response = restTemplate.exchange(apiNen, HttpMethod.POST, entity, String.class);

            ObjectMapper objectMapper = new ObjectMapper();
            JsonNode jsonResponse = objectMapper.readTree(response.getBody());

            return jsonResponse.path("output").asText();

        } catch (Exception e) {
            throw new RuntimeException("Error while calling NEN API: " + e.getMessage(), e);
        }
    }

    private String generateRandomString(int length) {
        String characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"; // Chỉ chữ cái
        Random random = new Random();
        StringBuilder sb = new StringBuilder(length);

        for (int i = 0; i < length; i++) {
            int index = random.nextInt(characters.length()); // Chọn ngẫu nhiên một ký tự trong tập hợp
            sb.append(characters.charAt(index));
        }

        return sb.toString(); // Trả về chuỗi ngẫu nhiên
    }
}
