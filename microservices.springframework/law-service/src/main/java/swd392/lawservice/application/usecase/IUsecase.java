package swd392.lawservice.application.usecase;


import swd392.lawservice.application.dto.Dto;
import swd392.lawservice.application.dto.LawRequestDto;
import swd392.lawservice.domain.entity.Law;
import swd392.lawservice.web.dto.LawResponseDto;

import java.util.List;
import java.util.UUID;

public interface IUsecase {
    LawResponseDto create(LawRequestDto lawRequestDto);
    LawResponseDto read(UUID id);
    List<LawResponseDto> readAll();
    LawResponseDto update(UUID id, LawRequestDto lawRequestDto);
    void delete(UUID id);
}