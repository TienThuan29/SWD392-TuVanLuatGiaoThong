package swd392.userpackageservice.web.dto;

import lombok.Data;
import java.math.BigDecimal;
import java.util.UUID;

@Data
public class PaymentRequest {
    private String orderId;
    private BigDecimal amount;
    private UUID userId;
}

