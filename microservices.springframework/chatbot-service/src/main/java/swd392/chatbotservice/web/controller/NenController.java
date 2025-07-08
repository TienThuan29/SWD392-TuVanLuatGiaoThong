package swd392.chatbotservice.web.controller;

import java.util.HashMap;
import java.util.Map;
import java.util.UUID;
import java.util.concurrent.TimeUnit;

import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import lombok.RequiredArgsConstructor;
import swd392.chatbotservice.application.dto.ApiResponse;
import swd392.chatbotservice.application.usecase.INenUsecase;
import swd392.chatbotservice.infrastructure.usecase.TrackingLimitationUsecase;
import swd392.chatbotservice.web.dto.NenRequest;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/chatbotNen")
@CrossOrigin(origins = "http://localhost:3000")
public class NenController {

    private final INenUsecase iNenUsecase;

    private final TrackingLimitationUsecase trackingLimitationUsecase;

    private final RedisTemplate<String, String> redisTemplate;

    @GetMapping("/health")
    public String healthCheck() {
        return "ChatbotNen service is running";
    }

    @PostMapping("/authenticated-user/generate")
    public ResponseEntity<ApiResponse<?>> generateWithAuthenticatedUser(
            @RequestBody NenRequest userPromptRequest) {
        if (this.trackingLimitationUsecase.canUserAsk(
                userPromptRequest.getUserId())) {
            return ResponseEntity.ok(
                    ApiResponse.builder()
                            .status("success")
                            .message("Content generated successfully for authenticated user")
                            .dataResponse(iNenUsecase.generateWithAuthenticatedUser(userPromptRequest))
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
                        .dataResponse(iNenUsecase.getAllChatHistoriesByUserId(userId))
                        .build());
    }

    @PutMapping("/rename-title")
    public ResponseEntity<ApiResponse<?>> renameChatTitle(
            @RequestParam("chatId") String chatId,
            @RequestParam("newTitle") String newTitle
    ) {
        return new ResponseEntity<>(this.iNenUsecase.renameChatTitle(chatId, newTitle), HttpStatus.OK);
    }

    @DeleteMapping("/delete-history/{chatId}")
    public ResponseEntity<ApiResponse<?>> deleteChatHistory(@PathVariable("chatId")UUID chatId) {
        return new ResponseEntity<>(this.iNenUsecase.deleteChatHistory(chatId), HttpStatus.OK);
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
