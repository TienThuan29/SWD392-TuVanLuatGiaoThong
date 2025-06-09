package swd392.chatbotservice.application.usecase;

import swd392.chatbotservice.application.dto.ResponseAi;

public interface IChatbotUsecase {

    // Generates content based on the provided prompt from Gemini.
    String generateContent(String prompt);

    ResponseAi generateContentFromPDF(String url, String prompt);
}
