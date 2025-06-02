package swd392.lawservice.web.dto;

import lombok.Data;
import swd392.lawservice.domain.entity.LawType;

import java.time.Instant;
import java.util.UUID;

@Data
public class LawRequestDto {
    UUID id;
    String tittle;
    String description;
    Instant issueDate;
    Instant effectiveDate;
    String sourceUrl;
    String filePath;
    boolean isDeleted;
    LawType lawType;

}
