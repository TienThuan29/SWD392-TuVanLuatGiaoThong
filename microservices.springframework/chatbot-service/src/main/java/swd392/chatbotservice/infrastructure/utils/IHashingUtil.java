package swd392.chatbotservice.infrastructure.utils;

public interface IHashingUtil {

    public String hash(String str);

    public String decode(String hash);

}
