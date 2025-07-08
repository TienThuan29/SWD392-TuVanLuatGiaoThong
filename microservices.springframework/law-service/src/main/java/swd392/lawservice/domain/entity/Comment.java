package swd392.lawservice.domain.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;
import java.util.UUID;

@Data
@Table(name = "comments")
@Entity
public class Comment {
    @Id
    @Column(name = "id")
    private UUID id = UUID.randomUUID();

    @Column(name="UserName")
    private String userName;

    @Column(name = "content",columnDefinition = "TEXT", nullable = false)
    private String content;

    @Column(name = "rating", nullable = false)
    private int rating;

    @CreationTimestamp
    @Column(name = "created_date", updatable = false)
    private LocalDateTime createdDate;

    @UpdateTimestamp
    @Column(name = "updated_date")
    private LocalDateTime updatedDate;
}
