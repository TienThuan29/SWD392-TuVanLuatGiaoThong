package swd392.userpackageservice.domain.entity;


import jakarta.persistence.*;
import lombok.Data;
import swd392.userpackageservice.domain.fixed.PayType;
import swd392.userpackageservice.domain.fixed.Status;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.UUID;

@Table(name = "transaction_history")
@Entity
@Data
public class TransactionHistory {
    @Id
    @GeneratedValue(strategy = jakarta.persistence.GenerationType.IDENTITY)
    private Long id;
    @Column(name = "order_id", nullable = false, updatable = false)
    private String orderId;
    @Column(name = "user_id", nullable = false, updatable = false)
    private UUID userId;
    @Column(name = "payment", nullable = false, updatable = false)
    private String paymentTransId;
    @Column(name = "pay_type")
    @Enumerated(EnumType.STRING)
    private PayType payType;
    @Column(name = "amount", nullable = false, updatable = false)
    private BigDecimal amount;
    @Column(name = "status")
    @Enumerated(EnumType.STRING)
    private Status status;
    @Column(name = "message", nullable = false, updatable = false)
    private String message;
    @Column(name = "paid_at", nullable = false, updatable = false)
    private LocalDateTime paidAt;
}
