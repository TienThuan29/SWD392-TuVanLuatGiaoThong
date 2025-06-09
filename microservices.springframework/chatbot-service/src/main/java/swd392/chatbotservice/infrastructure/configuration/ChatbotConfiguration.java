package swd392.chatbotservice.infrastructure.configuration;

import org.springframework.ai.vertexai.gemini.VertexAiGeminiChatModel;
import org.springframework.ai.vertexai.gemini.VertexAiGeminiChatOptions;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.google.cloud.vertexai.Transport;
import com.google.cloud.vertexai.VertexAI;

@Configuration
public class ChatbotConfiguration {

    @Value("${gemini.api.key}")
    private String apiKey;

    @Value("${spring.ai.vertex.ai.gemini.project-id}")
    private String projectId;

    @Value("${spring.ai.vertex.ai.gemini.location}")
    private String location;

    public String getApiKey() {
        return apiKey;
    }

    @Bean
    public VertexAI vertexAiApi() {
        return new VertexAI.Builder().setProjectId(this.projectId)
                .setLocation(this.location)
                .setTransport(Transport.REST)
                .build();
    }

    @Bean
    public VertexAiGeminiChatModel vertexAiEmbedding(VertexAI vertexAi) {
        return VertexAiGeminiChatModel.builder()
                .vertexAI(vertexAi)
                .defaultOptions(VertexAiGeminiChatOptions.builder()
                        .model(VertexAiGeminiChatModel.ChatModel.GEMINI_2_0_FLASH)
                        .build())
                .build();
    }

}
