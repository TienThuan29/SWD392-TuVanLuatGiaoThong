package swd392.userpackageservice.infrastructure.transaction;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import swd392.userpackageservice.domain.entity.TransactionHistory;
import swd392.userpackageservice.domain.repository.TransactionHistoryRepository;

@Service
@Transactional
@RequiredArgsConstructor
public class TransactionHistoryTransaction implements ITransactionHistory {
    private final TransactionHistoryRepository transactionHistoryRepository;

    public TransactionHistory save(TransactionHistory dto) {
        return transactionHistoryRepository.save(dto);
    }

}
