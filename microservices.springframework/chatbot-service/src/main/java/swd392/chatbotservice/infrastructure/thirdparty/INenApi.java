package swd392.chatbotservice.infrastructure.thirdparty;

public interface INenApi {

    public String generateNenResponse(String sessionId, String action, String chatInput);

}
