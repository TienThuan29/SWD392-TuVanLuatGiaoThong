package swd392.lawservice.application.dto;

import lombok.Data;
import swd392.lawservice.domain.entity.LawType;

import java.time.Instant;
import java.util.UUID;

@Data
public class LawResponseDto {
    UUID id;
    String tittle;
    String description;
    Instant issueDate;
    Instant effectiveDate;
    String sourceUrl;
    String filePath;
    boolean isDeleted;
    LawTypeResponse lawType;
    Instant createdDate;
    Instant updatedDate;
}
