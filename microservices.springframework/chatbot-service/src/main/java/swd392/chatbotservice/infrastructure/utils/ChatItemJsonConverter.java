package swd392.chatbotservice.infrastructure.utils;

import java.util.Collections;
import java.util.List;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBMappingException;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBTypeConverter;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.type.CollectionType;
import swd392.chatbotservice.domain.entity.ChatItem;

public class ChatItemJsonConverter implements DynamoDBTypeConverter<String, List<ChatItem>> {
    
    private final ObjectMapper objectMapper = new ObjectMapper();

    @Override
    public String convert(List<ChatItem> testCases) {
        try {
            if (testCases == null) {
                return objectMapper.writeValueAsString(Collections.singletonList(""));
            }
            return objectMapper.writeValueAsString(testCases);
        } 
        catch (Exception e) {
            throw new DynamoDBMappingException("Failed to convert chat_item list", e);
        }
    }

    @Override
    public List<ChatItem> unconvert(String json) {
        if (json == null || json.isEmpty()) {
            return Collections.emptyList();
        }
        try {
            CollectionType listType = objectMapper.getTypeFactory()
                    .constructCollectionType(List.class, ChatItem.class);
            return objectMapper.readValue(json, listType);
        } 
        catch (Exception e) {
            throw new DynamoDBMappingException("Failed to unconvert chat_item list", e);
        }
    }

}
