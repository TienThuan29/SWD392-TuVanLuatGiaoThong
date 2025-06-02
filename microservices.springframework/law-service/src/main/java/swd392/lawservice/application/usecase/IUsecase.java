package swd392.lawservice.application.usecase;

import swd392.lawservice.web.dto.LawRequestDto;
import swd392.lawservice.application.dto.LawResponseDto;
import swd392.lawservice.domain.entity.Law;
import java.util.List;
import java.util.UUID;

public interface IUsecase {
    LawResponseDto createLaw(LawRequestDto lawRequestDto);
    LawResponseDto getLawById(UUID id);
    List<LawResponseDto> getAllLaw();
    LawResponseDto update(UUID id, LawRequestDto lawRequestDto);
    void delete(UUID id);
}