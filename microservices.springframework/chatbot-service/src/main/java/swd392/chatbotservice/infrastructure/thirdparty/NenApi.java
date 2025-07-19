package swd392.chatbotservice.infrastructure.thirdparty;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
@PropertySource("classpath:security.properties")
public class NenApi implements INenApi {

    @Value("${third-party.n8n.api.endpoint}")
    private String apiNen;

    @Override
    public String generateNenResponse(String sessionId, String action, String chatInput) {
        try {
            RestTemplate restTemplate = new RestTemplate();
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

        }
        catch (Exception e) {
            throw new RuntimeException("Error while calling NEN API: " + e.getMessage(), e);
        }
    }
}
