package swd392.lawservice.web.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;
import java.time.Instant;

@Data
public class LawRequest {

    @NotBlank(message = "Title is required")
    @Size(min = 1, max = 255, message = "Title must be less than 255 characters")
    String title;

    @NotBlank(message = "Reference number is required")
    @Size(min = 1, max = 100, message = "Reference number must be less than 100 characters")
    String referenceNumber;

    @NotBlank(message = "Dateline is required")
    @Size(min = 1, max = 100, message = "Dateline must be less than 100 characters")
    String dateline;

    @NotBlank(message = "Issue date is required")
    Instant issueDate;

    @NotBlank(message = "Effective date is required")
    Instant effectiveDate;

    @NotBlank(message = "Source URL is required")
    String sourceUrl;

    @NotBlank(message = "File path is required")
    String filePath;

    @NotBlank(message = "Law type ID is required")
    String lawTypeId;
}
