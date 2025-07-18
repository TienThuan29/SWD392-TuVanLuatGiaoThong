package swd392.userpackageservice.web.dto;

import lombok.Data;
import java.time.Instant;
import java.util.List;
import java.util.UUID;

@Data
public class UsagePackageRequest {

    String name;

    String description;

    float price;

    int dailyLimit;

    int daysLimit;

    List<AIModelRequest> aiModels;

    @Data
    public static class AIModelRequest {

            UUID id;

            String modelName;

            String provider;

            String description;

            boolean isDeleted;

            Instant createdDate;

            Instant updatedDate;
    }
}
