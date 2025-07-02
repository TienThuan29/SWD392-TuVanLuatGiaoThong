package swd392.chatbotservice.infrastructure.utils;

import org.hashids.Hashids;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.stereotype.Component;

@Component("hashingUtil_ChatbotService")
@PropertySource("classpath:security.properties")
public class HashingUtil {

    @Value("${hashing.secret-key}")
    private final String hashingKey;

    private final int minHashLength = 8;

    public HashingUtil(@Value("${hashing.secret-key}") String hashingKey) {
        this.hashingKey = hashingKey;
    }

    public String hash(String str) {
        Hashids hashids = new Hashids(this.hashingKey, this.minHashLength);
        long[] numbers = str.chars()
                .mapToLong(c -> (long) c)
                .toArray();
        return hashids.encode(numbers);
    }

    public String decode(String hash) {
        Hashids hashids = new Hashids(this.hashingKey, this.minHashLength);
        long[] numbers = hashids.decode(hash);

        StringBuilder result = new StringBuilder();
        for (long number : numbers) {
            result.append((char) number);
        }
        return result.toString();
    }
}
