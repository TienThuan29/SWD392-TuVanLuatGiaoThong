package swd392.chatbotservice.web.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import swd392.chatbotservice.application.dto.ApiResponse;
import swd392.chatbotservice.application.dto.ChatRequest;
import swd392.chatbotservice.application.dto.RequestPDF;
import swd392.chatbotservice.application.usecase.IChatbotUsecase;
import swd392.chatbotservice.web.dto.UserPromptRequest;
import java.util.UUID;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/chatbot")
public class ChatbotController {

    private final IChatbotUsecase chatbotUsecase;
    
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
                .build()
        );
    }

    @PostMapping("/authenticated-user/generate")
    public ResponseEntity<ApiResponse<?>> generateWithAuthenticatedUser(@RequestBody UserPromptRequest userPromptRequest) {
        return ResponseEntity.ok(
            ApiResponse.builder()
                .status("success")
                .message("Content generated successfully for authenticated user")
                .dataResponse(chatbotUsecase.generateWithAuthenticatedUser(userPromptRequest))
                .build()
        );
    }

    @GetMapping("/authenticated-user/get-histories/{userId}")
    public ResponseEntity<ApiResponse<?>> getAllChatHistoriesByUserId(@PathVariable("userId") UUID userId) {
        return ResponseEntity.ok(
          ApiResponse.builder()
                  .status("success")
                  .message("Content generated successfully for authenticated user")
                  .dataResponse(chatbotUsecase.getAllChatHistoriesByUserId(userId))
                  .build()
        );
    }

    @PostMapping("/generate-from-pdf")
    public ResponseEntity<ApiResponse<Object>> generateContentFromPdf(@RequestBody RequestPDF request) throws Exception {
        System.out.println();
        return ResponseEntity.ok(
            ApiResponse.builder()
                .status("success")
                .message("Content generated from PDF successfully")
                .dataResponse(chatbotUsecase.generateContentFromPDF(request.getUrl(), request.getPrompt()))
                .build()
        );
    }

    @PostMapping("/generate-from-pdf-multiparth")
    public ResponseEntity<ApiResponse<Object>> generateContentFromPdf(@RequestBody ChatRequest request) throws Exception {
        return ResponseEntity.ok(
            ApiResponse.builder()
                .status("success")
                .message("Content generated from PDF successfully")
                .dataResponse(chatbotUsecase.generateContentFromPDF(request.getPdfFile(), request.getPrompt()))
                .build()
        );
    }

}
