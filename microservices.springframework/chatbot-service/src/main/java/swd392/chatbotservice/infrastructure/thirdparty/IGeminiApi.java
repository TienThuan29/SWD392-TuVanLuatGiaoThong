package swd392.chatbotservice.infrastructure.thirdparty;

import swd392.chatbotservice.infrastructure.thirdparty.dto.GeminiResponse;
import swd392.chatbotservice.infrastructure.thirdparty.dto.GeminiTrafficResponse;
import java.util.List;

public interface IGeminiApi {

    public GeminiResponse generateContentAsObject(String prompt, List<String> contexts, String geminiAlias);

    public GeminiTrafficResponse generateTrafficLawResponse(String prompt, List<String> contexts, String geminiAlias);

}
