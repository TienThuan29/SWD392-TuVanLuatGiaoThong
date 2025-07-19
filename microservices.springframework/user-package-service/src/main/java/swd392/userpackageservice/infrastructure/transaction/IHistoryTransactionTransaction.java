package swd392.userpackageservice.infrastructure.transaction;

import swd392.userpackageservice.domain.entity.TransactionHistory;

public interface IHistoryTransactionTransaction {

    public TransactionHistory save(TransactionHistory dto);

}
