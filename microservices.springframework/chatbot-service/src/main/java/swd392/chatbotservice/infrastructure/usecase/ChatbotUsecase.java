package swd392.chatbotservice.infrastructure.usecase;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import swd392.chatbotservice.application.usecase.IChatbotUsecase;
import swd392.chatbotservice.infrastructure.configuration.ChatbotConfiguration;

@Service
public class ChatbotUsecase implements IChatbotUsecase {

    @Autowired
    private ChatbotConfiguration config;

    @Override
    public String generateContent(String prompt) {

        RestTemplate restTemplate = new RestTemplate();

        String endpoint = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=" + config.getApiKey();

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

}
