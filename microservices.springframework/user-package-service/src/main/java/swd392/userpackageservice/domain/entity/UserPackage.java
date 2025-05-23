package swd392.userpackageservice.domain.entity;

import java.time.Instant;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.util.UUID;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@Builder
@Table(name = "user_packages")
@NoArgsConstructor
@AllArgsConstructor
public class UserPackage {

    @Id
    @Column(name = "id", nullable = false, updatable = false)
    private UUID id = UUID.randomUUID();

    @Column(name = "user_id", nullable = false, updatable = false)
    private UUID userId;

    @Column(name = "package_id", nullable = false, updatable = false)
    private UUID packageId;

    @Column(name = "price")
    private float price;

    @Column(name = "transaction_date")
    private Instant transactionDate;

    @PrePersist
    public void prePersist() {
        var zoneId = ZoneId.of("Asia/Ho_Chi_Minh");
        this.transactionDate = ZonedDateTime.now(zoneId).toInstant();
    }
}
