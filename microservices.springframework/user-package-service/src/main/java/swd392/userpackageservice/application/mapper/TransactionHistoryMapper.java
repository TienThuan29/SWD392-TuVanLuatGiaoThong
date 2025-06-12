package swd392.userpackageservice.application.mapper;

import org.springframework.stereotype.Component;
import swd392.userpackageservice.domain.entity.TransactionHistory;
import swd392.userpackageservice.web.dto.TransactionHistoryRequest;

@Component
public class TransactionHistoryMapper {
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
}

