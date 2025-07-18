package swd392.userpackageservice.application.dto;

import lombok.Data;
import java.time.Instant;
import java.util.List;
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

    private String modelType;

    private Instant createdDate;

    private Instant updatedDate;

    private List<AIModelResponse> aiModels;
}
