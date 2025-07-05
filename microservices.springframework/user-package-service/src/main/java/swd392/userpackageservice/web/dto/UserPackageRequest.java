package swd392.userpackageservice.web.dto;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.UUID;
import lombok.Data;

@Data
public class UserPackageRequest {
    UUID userId;
    UUID packageId;
    BigDecimal price;
    Instant transactionDate;
}
