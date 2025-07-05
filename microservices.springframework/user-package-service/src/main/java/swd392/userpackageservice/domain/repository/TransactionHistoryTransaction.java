package swd392.userpackageservice.domain.repository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import swd392.userpackageservice.application.mapper.TransactionHistoryMapper;
import swd392.userpackageservice.domain.entity.TransactionHistory;
import swd392.userpackageservice.web.dto.TransactionHistoryRequest;

@Service
@Transactional
@RequiredArgsConstructor
public class TransactionHistoryTransaction
{
    private final TransactionHistoryRepository transactionHistoryRepository;

    public TransactionHistory save(TransactionHistory dto) {
        return transactionHistoryRepository.save(dto);
    }

}
