package swd392.lawservice.domain.repository;

public interface ITransactionLaw {
    void commitTransaction();
    void rollbackTransaction();
}