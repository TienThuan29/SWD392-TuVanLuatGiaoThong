package swd392.lawservice.web.dto;

import lombok.Data;
import swd392.lawservice.domain.entity.LawType;

import java.time.Instant;
import java.util.UUID;

@Data
public class Dto {
    UUID uuid;
    String description;
    Instant issueDate;
    Instant effectiveDate;
    String sourceUrl;
    String filePath;
    boolean isDeleted;
    LawType lawType;

}
