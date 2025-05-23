package swd392.chatbotservice.web.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/chatbot")
public class ChatbotController {
    
    @GetMapping("/health")
    public String healthCheck() {
        return "Chatbot service is running";
    }

}
