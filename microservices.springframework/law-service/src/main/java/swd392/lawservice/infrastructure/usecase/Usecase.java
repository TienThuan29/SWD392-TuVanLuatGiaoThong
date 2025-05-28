package swd392.lawservice.infrastructure.usecase;
import org.springframework.stereotype.Service;
import swd392.lawservice.application.usecase.IUsecase;
import swd392.lawservice.domain.entity.Law;

import java.util.List;
import java.util.UUID;

@Service
public class Usecase implements IUsecase {
    @Override
    public Law create(Law law) {
        return null;
    }

    @Override
    public Law read(UUID id) {
        return null;
    }

    @Override
    public List<Law> readAll() {
        return List.of();
    }

    @Override
    public Law update(UUID id, Law law) {
        return null;
    }

    @Override
    public void delete(UUID id) {

    }

}
