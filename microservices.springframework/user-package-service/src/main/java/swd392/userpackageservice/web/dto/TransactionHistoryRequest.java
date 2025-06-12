package swd392.userpackageservice.web.dto;

import lombok.Data;
import swd392.userpackageservice.domain.fixed.PayType;
import swd392.userpackageservice.domain.fixed.Status;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.UUID;

@Data
public class TransactionHistoryRequest {
    private String orderId;
    private UUID userId;
    private String paymentTransId;
    private PayType payType;
    private BigDecimal amount;
    private Status status;
    private String message;
    private LocalDateTime paidAt;
}
