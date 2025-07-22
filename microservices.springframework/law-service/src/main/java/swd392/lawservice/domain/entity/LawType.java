package swd392.lawservice.domain.entity;

import java.util.UUID;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.Instant;
import java.time.ZoneId;
import java.time.ZonedDateTime;

@Data
@Entity
@Table(name = "law_types")
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class LawType {
    
    @Id
    private UUID id = UUID.randomUUID();

    @Column(name = "name", length = 100)
    private String name;

    @Column(name = "is_deleted")
    private boolean isDeleted;

    @Column(name = "created_date")
    private Instant createdDate;

    @Column(name = "updated_date")
    private Instant updatedDate;

    @PrePersist
    public void prePersist() {
        var zoneId = ZoneId.of("Asia/Ho_Chi_Minh");
        this.createdDate = ZonedDateTime.now(zoneId).toInstant();
    }
}
