package swd392.userpackageservice.application.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import java.time.Instant;
import java.util.UUID;

@Data
@Builder
@AllArgsConstructor
public class AIModelResponse {

    private UUID id;

    private String modelName;

    private String provider;

    private String description;

    private boolean isDeleted;

    private Instant createdDate;

    private Instant updatedDate;

}
