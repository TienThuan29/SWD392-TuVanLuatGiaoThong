package swd392.lawservice.domain.repository;

import swd392.lawservice.domain.entity.Law;

import java.util.UUID;

public interface ITransactionLaw {
    void commitTransaction();
    void rollbackTransaction();
    void save(Law law);
    void update(Law law);
    void delete(UUID lawId);
}