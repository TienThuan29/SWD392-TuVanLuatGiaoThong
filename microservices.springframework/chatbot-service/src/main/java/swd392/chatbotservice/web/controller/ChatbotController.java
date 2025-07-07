package swd392.chatbotservice.web.controller;

import com.amazonaws.services.dynamodbv2.xspec.S;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import swd392.chatbotservice.application.dto.ApiResponse;
import swd392.chatbotservice.application.dto.ChatRequest;
import swd392.chatbotservice.application.dto.RequestPDF;
import swd392.chatbotservice.application.usecase.IChatbotUsecase;
import swd392.chatbotservice.infrastructure.usecase.TrackingLimitationUsecase;
import swd392.chatbotservice.web.dto.ChatTitleRenamingRequest;
import swd392.chatbotservice.web.dto.UserPromptRequest;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;
import java.util.concurrent.TimeUnit;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/chatbot")
public class ChatbotController {

    private final IChatbotUsecase chatbotUsecase;

    private final TrackingLimitationUsecase trackingLimitationUsecase;

    private final RedisTemplate<String, String> redisTemplate;

    @GetMapping("/health")
    public String healthCheck() {
        return "Chatbot service is running";
    }

    @PostMapping("/generate")
    public ResponseEntity<ApiResponse<Object>> generate(@RequestBody String prompt) {
        return ResponseEntity.ok(
                ApiResponse.builder()
                        .status("success")
                        .message("Content generated successfully")
                        .dataResponse(chatbotUsecase.generateContent(prompt))
                        .build());
    }

    @PutMapping("/rename-title")
    public ResponseEntity<ApiResponse<?>> renameChatTitle(
            @RequestParam("chatId") String chatId,
            @RequestParam("newTitle") String newTitle
    ) {
        return new ResponseEntity<>(this.chatbotUsecase.renameChatTitle(chatId, newTitle), HttpStatus.OK);
    }

    @DeleteMapping("/delete-history/{chatId}")
    public ResponseEntity<ApiResponse<?>> deleteChatHistory(@PathVariable("chatId")UUID chatId) {
        return new ResponseEntity<>(this.chatbotUsecase.deleteChatHistory(chatId), HttpStatus.OK);
    }

    @PostMapping("/authenticated-user/generate")
    public ResponseEntity<ApiResponse<?>> generateWithAuthenticatedUser(
            @RequestBody UserPromptRequest userPromptRequest) {
        if (this.trackingLimitationUsecase.canUserAsk(
                userPromptRequest.getUserId())) {
            return ResponseEntity.ok(
                    ApiResponse.builder()
                            .status("success")
                            .message("Content generated successfully for authenticated user")
                            .dataResponse(chatbotUsecase.generateWithAuthenticatedUser(userPromptRequest))
                            .build());
        } else {
            return ResponseEntity.ok(
                    ApiResponse.builder()
                            .status("fail")
                            .message("Daily limit reached for user")
                            .dataResponse(null)
                            .build());
        }
    }

    @GetMapping("/authenticated-user/get-histories/{userId}")
    public ResponseEntity<ApiResponse<?>> getAllChatHistoriesByUserId(@PathVariable("userId") String userId) {
        return ResponseEntity.ok(
                ApiResponse.builder()
                        .status("success")
                        .message("Content generated successfully for authenticated user")
                        .dataResponse(chatbotUsecase.getAllChatHistoriesByUserId(userId))
                        .build());
    }

    @PostMapping("/generate-from-pdf")
    public ResponseEntity<ApiResponse<Object>> generateContentFromPdf(@RequestBody RequestPDF request)
            throws Exception {
        System.out.println();
        return ResponseEntity.ok(
                ApiResponse.builder()
                        .status("success")
                        .message("Content generated from PDF successfully")
                        .dataResponse(chatbotUsecase.generateContentFromPDF(request.getUrl(), request.getPrompt()))
                        .build());
    }

    @PostMapping("/generate-from-pdf-multiparth")
    public ResponseEntity<ApiResponse<Object>> generateContentFromPdf(@RequestBody ChatRequest request)
            throws Exception {
        return ResponseEntity.ok(
                ApiResponse.builder()
                        .status("success")
                        .message("Content generated from PDF successfully")
                        .dataResponse(chatbotUsecase.generateContentFromPDF(request.getPdfFile(), request.getPrompt()))
                        .build());
    }

    @GetMapping("/test-redis")
    public ResponseEntity<Map<String, String>> health() {
        String status;
        try {
            redisTemplate.opsForValue().set("test:ping", "pong", 10, TimeUnit.SECONDS);
            String result = redisTemplate.opsForValue().get("test:ping");
            status = "Redis connection successful: " + result;
        } catch (Exception e) {
            status = "Redis connection failed: " + e.getMessage();
        }
        Map<String, String> response = new HashMap<>();
        response.put("status", status);
        return ResponseEntity.ok(response);
    }

}
