package swd392.chatbotservice.web.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import swd392.chatbotservice.application.dto.ApiResponse;
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
    public ResponseEntity<?> generate(@RequestBody String prompt) {
//         return iChatbotUsecase.generateContent(prompt);
         return ResponseEntity.ok(iChatbotUsecase.generateContent(prompt));
//        return ApiResponse.builder()
//                .status("success")
//                .message("Content generated successfully")
//                .dataResponse(iChatbotUsecase.generateContent(prompt))
//                .build();
    }

}
