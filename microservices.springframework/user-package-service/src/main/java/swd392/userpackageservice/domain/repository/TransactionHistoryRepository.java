package swd392.userpackageservice.domain.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import swd392.userpackageservice.domain.entity.TransactionHistory;

import java.util.List;
import java.util.UUID;

@Repository
public interface TransactionHistoryRepository extends JpaRepository<TransactionHistory, Long> {
     List<TransactionHistory> findByUserId(UUID userId);
}
