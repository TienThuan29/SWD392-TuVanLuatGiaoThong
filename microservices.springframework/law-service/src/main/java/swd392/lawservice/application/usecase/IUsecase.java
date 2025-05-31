package swd392.lawservice.application.usecase;


import swd392.lawservice.application.dto.Dto;
import swd392.lawservice.domain.entity.Law;
import java.util.List;
import java.util.UUID;

public interface IUsecase {
    Dto create(Law law);
    Dto read(UUID id);
    List<Dto> readAll();
    Dto update(UUID id, Law law);
    void delete(UUID id);
}