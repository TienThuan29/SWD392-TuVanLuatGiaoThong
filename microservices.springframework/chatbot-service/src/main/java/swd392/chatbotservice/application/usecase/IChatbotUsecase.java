package swd392.chatbotservice.application.usecase;

public interface IChatbotUsecase {

    // Generates content based on the provided prompt from Gemini.
    String generateContent(String prompt);
}
