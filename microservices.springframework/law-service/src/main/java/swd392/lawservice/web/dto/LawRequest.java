package swd392.lawservice.web.dto;

import lombok.Data;
import java.time.Instant;
import java.util.UUID;

@Data
public class LawRequest {
    String tittle;
    String referenceNumber;
    String dateline;
    Instant issueDate;
    Instant effectiveDate;
    String sourceUrl;
    String filePath;
    boolean isDeleted;
    String lawTypeId;
}
