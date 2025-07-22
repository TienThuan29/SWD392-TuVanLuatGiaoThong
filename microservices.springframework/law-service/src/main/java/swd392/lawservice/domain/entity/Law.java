package swd392.lawservice.domain.entity;

import java.util.UUID;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
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
@Builder
@Entity
@Table(name = "laws")
@NoArgsConstructor
@AllArgsConstructor
public class Law {
    
    @Id
    @Column(name = "id")
    private UUID id = UUID.randomUUID();

    @Column(name = "reference_number", length = 100)
    private String referenceNumber;

    @Column(name = "dateline", length = 100)
    private String dateline;

    @Column(name = "title", length = 255)
    private String title;

    @ManyToOne
    @JoinColumn(name = "law_type_id")
    private LawType lawType;

    @Column(name = "issue_date")
    private Instant issueDate;

    @Column(name = "effective_date")
    private Instant effectiveDate;

    @Column(name = "source_url", columnDefinition = "TEXT")
    private String sourceUrl;

    @Column(name = "file_path", columnDefinition = "TEXT")
    private String filePath;

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
