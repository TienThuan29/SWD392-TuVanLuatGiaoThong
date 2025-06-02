package swd392.lawservice.infrastructure.usecase;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import swd392.lawservice.web.dto.LawRequestDto;
import swd392.lawservice.application.usecase.IUsecase;
import swd392.lawservice.domain.entity.Law;
import swd392.lawservice.domain.repository.ITransactionLaw;
import swd392.lawservice.domain.repository.LawRepository;
import swd392.lawservice.application.dto.LawResponseDto;

import java.util.List;
import java.util.UUID;

@Service
public class Usecase implements IUsecase {

    @Autowired
    private ITransactionLaw iTransactionLaw;

    @Autowired
    private LawRepository lawRepository;


    @Override
    public void delete(UUID id) {
        // Implementation logic for deleting a law by ID
    }

    @Override
    public LawResponseDto createLaw(LawRequestDto lawRequestDto) {
        // TODO Auto-generated method stub
        Law law = Law.builder()
        .title(lawRequestDto.getTittle())
        .lawType(lawRequestDto.getLawType())
        .issueDate(lawRequestDto.getIssueDate())
        .effectiveDate(lawRequestDto.getEffectiveDate())
        .sourceUrl(lawRequestDto.getSourceUrl())
        .filePath(lawRequestDto.getFilePath())
        .isDeleted(lawRequestDto.isDeleted())
        .issueDate(lawRequestDto.getIssueDate())
        .build();

        iTransactionLaw.save(law);

        LawResponseDto lawResponseDto = new LawResponseDto(); 
        lawResponseDto.setId(law.getId());
        lawResponseDto.setTittle(law.getTitle());

        lawResponseDto.setIssueDate(law.getIssueDate());
        lawResponseDto.setEffectiveDate(law.getEffectiveDate());
        lawResponseDto.setSourceUrl(law.getSourceUrl());
        lawResponseDto.setFilePath(law.getFilePath());
        lawResponseDto.setDeleted(law.isDeleted());
        lawResponseDto.setLawType(law.getLawType());
        return lawResponseDto;
        // throw new UnsupportedOperationException("Unimplemented method 'create'");
    }

    @Override
    public LawResponseDto update(UUID id, LawRequestDto lawRequestDto) {
        // TODO Auto-generated method stub
        Law law =lawRepository.findById(id)
            .orElseThrow(() -> new IllegalArgumentException("Law not found with id: " + id));
            law.setTitle(lawRequestDto.getTittle());
            law.setLawType(lawRequestDto.getLawType());
            law.setIssueDate(lawRequestDto.getIssueDate());
            law.setEffectiveDate(lawRequestDto.getEffectiveDate());
            law.setSourceUrl(lawRequestDto.getSourceUrl());
            law.setFilePath(lawRequestDto.getFilePath());
            law.setDeleted(lawRequestDto.isDeleted());

            iTransactionLaw.update(law);

        LawResponseDto lawResponseDto = new LawResponseDto();
        lawResponseDto.setId(law.getId());
        lawResponseDto.setTittle(law.getTitle());
        lawResponseDto.setIssueDate(law.getIssueDate());     
        lawResponseDto.setEffectiveDate(law.getEffectiveDate());
        lawResponseDto.setSourceUrl(law.getSourceUrl());
        lawResponseDto.setFilePath(law.getFilePath());
        lawResponseDto.setDeleted(law.isDeleted());
        lawResponseDto.setLawType(law.getLawType());
        return lawResponseDto;
    }

    @Override
    public LawResponseDto getLawById(UUID id) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'read'");
    }

    @Override
    public List<LawResponseDto> getAllLaw() {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'readAll'");
    }
}
