package swd392.lawservice.domain.repository;

import swd392.lawservice.domain.entity.Law;
import java.util.UUID;

public interface ITransactionLaw {
    void commitTransaction();
    void rollbackTransaction();
    Law save(Law law);
    Law update(Law law);
    boolean delete(UUID lawId);
}