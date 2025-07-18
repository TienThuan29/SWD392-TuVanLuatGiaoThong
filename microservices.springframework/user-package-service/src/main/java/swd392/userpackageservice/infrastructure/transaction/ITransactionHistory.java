package swd392.userpackageservice.infrastructure.transaction;

import swd392.userpackageservice.domain.entity.TransactionHistory;

public interface ITransactionHistory {

    public TransactionHistory save(TransactionHistory dto);

}
