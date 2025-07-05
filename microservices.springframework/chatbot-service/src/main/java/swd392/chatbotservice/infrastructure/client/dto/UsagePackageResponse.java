package swd392.chatbotservice.infrastructure.client.dto;

import lombok.Data;
import java.time.Instant;
import java.util.UUID;

@Data
public class UsagePackageResponse {

    private UUID id;

    private String name;

    private String description;

    private float price;

    private int dailyLimit;

    private int daysLimit;

    private boolean isDeleted;

    private Instant createdDate;

    private Instant updatedDate;
}