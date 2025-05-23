package swd392.chatbotservice.infrastructure.utils;

import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBTypeConverter;
import java.time.Instant;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;

public class VietnamTimestampConverter implements DynamoDBTypeConverter<String, Instant> {

    private static final DateTimeFormatter FORMATTER = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")
            .withZone(ZoneId.of("Asia/Ho_Chi_Minh"));

    @Override
    public String convert(Instant instant) {
        return FORMATTER.format(instant);
    }

    @Override
    public Instant unconvert(String timestamp) {
        return Instant.from(FORMATTER.parse(timestamp));
    }
}
