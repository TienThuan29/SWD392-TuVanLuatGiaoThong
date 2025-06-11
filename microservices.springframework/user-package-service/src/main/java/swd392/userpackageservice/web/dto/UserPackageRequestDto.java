package swd392.userpackageservice.web.dto;

import java.time.Instant;
import java.util.UUID;

import lombok.Data;

@Data
public class UserPackageRequestDto {
    UUID userId;
    UUID packageId;
    float price;
    Instant transactionDate;
}
