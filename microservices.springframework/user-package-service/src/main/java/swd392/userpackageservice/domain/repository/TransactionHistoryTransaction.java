package swd392.userpackageservice.domain.repository;

import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;
import swd392.userpackageservice.application.mapper.TransactionHistoryMapper;
import swd392.userpackageservice.web.dto.TransactionHistoryRequest;

@Service
@Transactional
public class TransactionHistoryTransaction {
    private final TransactionHistoryRepository transactionHistoryRepository;
    private final TransactionHistoryMapper mapper;

    public TransactionHistoryTransaction(TransactionHistoryRepository transactionHistoryRepository,
                                         TransactionHistoryMapper mapper) {
        this.transactionHistoryRepository = transactionHistoryRepository;
        this.mapper = mapper;
    }

    public void save(TransactionHistoryRequest dto) {
        transactionHistoryRepository.save(mapper.toEntity(dto));
    }

}
