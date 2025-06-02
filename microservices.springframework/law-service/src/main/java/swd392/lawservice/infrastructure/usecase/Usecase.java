package swd392.lawservice.infrastructure.usecase;
import org.springframework.stereotype.Service;

import swd392.lawservice.application.dto.LawRequestDto;
import swd392.lawservice.application.usecase.IUsecase;
import swd392.lawservice.domain.entity.Law;
import swd392.lawservice.web.dto.LawResponseDto;

import java.util.List;
import java.util.UUID;

@Service
public class Usecase implements IUsecase {

    @Override
    public void delete(UUID id) {
        // Implementation logic for deleting a law by ID
    }

    @Override
    public LawResponseDto create(LawRequestDto lawRequestDto) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'create'");
    }

    @Override
    public LawResponseDto update(UUID id, LawRequestDto lawRequestDto) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'update'");
    }

    @Override
    public LawResponseDto read(UUID id) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'read'");
    }

    @Override
    public List<LawResponseDto> readAll() {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'readAll'");
    }
}
