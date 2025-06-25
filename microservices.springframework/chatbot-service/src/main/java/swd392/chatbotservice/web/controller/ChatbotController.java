package swd392.chatbotservice.web.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


import swd392.chatbotservice.application.dto.ApiResponse;
import swd392.chatbotservice.application.dto.ChatRequest;
import swd392.chatbotservice.application.dto.RequestPDF;
import swd392.chatbotservice.application.usecase.IChatbotUsecase;

@RestController
@RequestMapping("/api/v1/chatbot")
public class ChatbotController {

    @Autowired
    private IChatbotUsecase iChatbotUsecase;
    
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
                .dataResponse(iChatbotUsecase.generateContent(prompt))
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
                .dataResponse(iChatbotUsecase.generateContentFromPDF(request.getUrl(), request.getPrompt()))
                .build()
        );
    }

    @PostMapping("/generate-from-pdf-multiparth")
    public ResponseEntity<ApiResponse<Object>> generateContentFromPdf(@RequestBody ChatRequest request) throws Exception {
        return ResponseEntity.ok(
            ApiResponse.builder()
                .status("success")
                .message("Content generated from PDF successfully")
                .dataResponse(iChatbotUsecase.generateContentFromPDF(request.getPdfFile(), request.getPrompt()))
                .build()
        );
    }

}
