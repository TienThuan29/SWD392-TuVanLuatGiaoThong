package swd392.userpackageservice.application.dto;

import java.time.Instant;
import java.util.UUID;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserPackageResponseDto {
    private UUID id;
    private UUID userId;
    private UUID packageId;
    private float price;
    private Instant transactionDate;
}
