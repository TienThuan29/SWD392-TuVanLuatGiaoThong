package swd392.userpackageservice.domain.entity;

import java.time.Instant;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.util.List;
import java.util.UUID;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@Builder
@Table(name = "usage_packages")
@NoArgsConstructor
@AllArgsConstructor
public class UsagePackage {
    
    @Id
    @Column(name = "id", nullable = false, updatable = false)
    private UUID id;

    @Column(name = "name", length = 60, nullable = false)
    private String name;

    @Column(name = "description", columnDefinition = "TEXT")
    private String description;

    @Column(name = "price")
    private float price;

    @Column(name = "daily_limit")
    private int dailyLimit;

    @Column(name = "days_limit")
    private int daysLimit;

    @Column(name = "is_deleted")
    private boolean isDeleted;

    @Column(name = "created_date")
    private Instant createdDate;

    @Column(name = "updated_date")
    private Instant updatedDate;

    @ManyToMany(cascade = {CascadeType.DETACH, CascadeType.MERGE, CascadeType.PERSIST, CascadeType.REFRESH})
    @JoinTable(
            name = "packages_models",
            joinColumns = @JoinColumn(name = "package_id", referencedColumnName = "id"),
            inverseJoinColumns = @JoinColumn(name = "model_id", referencedColumnName = "id")
    )
    private List<AIModel> aiModels;

    @PrePersist
    public void prePersist() {
        var zoneId = ZoneId.of("Asia/Ho_Chi_Minh");
        this.createdDate = ZonedDateTime.now(zoneId).toInstant();
    }
}
