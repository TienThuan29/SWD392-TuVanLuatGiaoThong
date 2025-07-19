package swd392.userpackageservice.infrastructure.utils;

public interface IHashingUtil {

    public String hash(String str);

    public String decode(String hash);

}
