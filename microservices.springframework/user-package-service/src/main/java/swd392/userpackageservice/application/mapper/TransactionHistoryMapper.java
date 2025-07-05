package swd392.userpackageservice.application.mapper;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import swd392.userpackageservice.application.dto.TransactionCompletionResponse;
import swd392.userpackageservice.domain.entity.TransactionHistory;
import swd392.userpackageservice.domain.entity.UsagePackage;
import swd392.userpackageservice.web.dto.TransactionHistoryRequest;

@Component
@RequiredArgsConstructor
public class TransactionHistoryMapper {

    private final UsagePackageMapper usagePackageMapper;

    public TransactionHistory toEntity(TransactionHistoryRequest dto) {
        TransactionHistory entity = new TransactionHistory();
        entity.setOrderId(dto.getOrderId());
        entity.setUserId(dto.getUserId());
        entity.setPaymentTransId(dto.getPaymentTransId());
        entity.setPayType(dto.getPayType());
        entity.setAmount(dto.getAmount());
        entity.setStatus(dto.getStatus());
        entity.setMessage(dto.getMessage());
        entity.setPaidAt(dto.getPaidAt());
        return entity;
    }

    public TransactionCompletionResponse toTransactionCompletionResponse(
            TransactionHistory transactionHistory, UsagePackage usagePackage
    ) {
        TransactionCompletionResponse response = new TransactionCompletionResponse();
        response.setOrderId(transactionHistory.getOrderId());
        response.setAmount(transactionHistory.getAmount());
        response.setStatus(transactionHistory.getStatus().name());
        response.setMessage(transactionHistory.getMessage());
        response.setPaidAt(transactionHistory.getPaidAt());
        response.setUsagePackage(usagePackageMapper.toResponse(usagePackage));
        return response;
    }
}

