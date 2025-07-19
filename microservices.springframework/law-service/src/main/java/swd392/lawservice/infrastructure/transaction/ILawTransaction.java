package swd392.lawservice.infrastructure.transaction;

import swd392.lawservice.domain.entity.Law;
import java.util.UUID;

public interface ILawTransaction {
    void commitTransaction();
    void rollbackTransaction();
    Law save(Law law);
    Law update(Law law);
    boolean delete(UUID lawId);
}