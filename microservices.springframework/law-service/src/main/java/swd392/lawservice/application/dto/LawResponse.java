package swd392.lawservice.application.dto;

import lombok.Data;

import java.time.Instant;
import java.util.UUID;

@Data
public class LawResponse {
    UUID id;
    String tittle;
    String referenceNumber;
    String dateline;
    Instant issueDate;
    Instant effectiveDate;
    String sourceUrl;
    String filePath;
    boolean isDeleted;
    LawTypeResponse lawType;
    Instant createdDate;
    Instant updatedDate;
}
