package swd392.lawservice.application.usecase;


import swd392.lawservice.domain.entity.Law;
import java.util.List;
import java.util.UUID;

public interface IUsecase {
    Law create(Law law);
    Law read(UUID id);
    List<Law> readAll();
    Law update(UUID id, Law law);
    void delete(UUID id);
}