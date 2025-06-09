package swd392.lawservice.infrastructure.usecase;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import swd392.lawservice.web.dto.LawRequestDto;
import swd392.lawservice.application.usecase.ILawService;
import swd392.lawservice.domain.entity.Law;
import swd392.lawservice.domain.entity.LawType;
import swd392.lawservice.domain.repository.ITransactionLaw;
import swd392.lawservice.domain.repository.LawRepository;
import swd392.lawservice.domain.repository.LawTypeRepository;
import swd392.lawservice.application.dto.LawResponseDto;
import swd392.lawservice.application.dto.LawTypeResponse;

import java.util.List;
import java.util.UUID;

@Service
public class LawServiceImpl implements ILawService {

    @Autowired
    private ITransactionLaw iTransactionLaw;

    @Autowired
    private LawRepository lawRepository;

    @Autowired
    private LawTypeRepository lawTypeRepository;


    @Override
    public void delete(UUID id) {
        // Implementation logic for deleting a law by ID
        Law law = lawRepository.findById(id)
            .orElseThrow(() -> new IllegalArgumentException("Law not found with id: " + id));
        law.setDeleted(true); // Assuming you want to mark it as deleted
        iTransactionLaw.update(law); // Update the law to set it as deleted

    }

    @Override
    public LawResponseDto createLaw(LawRequestDto lawRequestDto) {
        // TODO Auto-generated method stub
         Law law = convertToLawEntity(lawRequestDto);
        // Set the ID to a new UUID if not provided
        if (law.getId() == null) {
            law.setId(UUID.randomUUID());
        }
        iTransactionLaw.save(law);
        return convertToLawResponseDto(law);
    }

    @Override
    public LawResponseDto update(UUID id, LawRequestDto lawRequestDto) {
        // TODO Auto-generated method stub
        Law law = lawRepository.findById(id)
            .orElseThrow(() -> new IllegalArgumentException("Law not found with id: " + id));
        LawType lawType = lawTypeRepository.findById(lawRequestDto.getLawTypeId())
            .orElseThrow(() -> new IllegalArgumentException("LawType not found with id: " + lawRequestDto.getLawTypeId()));

        law.setTitle(lawRequestDto.getTittle());
        law.setLawType(lawType);
        law.setReferenceNumber(lawRequestDto.getReferenceNumber());
        law.setDateline(lawRequestDto.getDateline());
        law.setIssueDate(lawRequestDto.getIssueDate());
        law.setEffectiveDate(lawRequestDto.getEffectiveDate());
        law.setSourceUrl(lawRequestDto.getSourceUrl());
        law.setFilePath(lawRequestDto.getFilePath());
        law.setDeleted(lawRequestDto.isDeleted());
        iTransactionLaw.save(law);
        return convertToLawResponseDto(law);
    }

    @Override
    public LawResponseDto getLawById(UUID id) {
        // TODO Auto-generated method stub
        Law law = lawRepository.findById(id)
            .orElseThrow(() -> new IllegalArgumentException("Law not found with id: " + id));
       return convertToLawResponseDto(law);
        // throw new UnsupportedOperationException("Unimplemented method 'read'");
    }

    @Override
    public List<LawResponseDto> getAllLaw() {
        // TODO Auto-generated method stub
        List<Law> laws = lawRepository.findAll();
        List<LawResponseDto> lawResponseDtos = laws.stream().map(law -> {
            return convertToLawResponseDto(law);
        }).toList();
        return lawResponseDtos;
    }


    

    private Law convertToLawEntity(LawRequestDto lawRequestDto) {
        // Convert LawRequestDto to Law entity
        LawType lawType = lawTypeRepository.findById(lawRequestDto.getLawTypeId())
            .orElseThrow(() -> new IllegalArgumentException("LawType not found with id: " + lawRequestDto.getLawTypeId()));
        
        return Law.builder()
            .title(lawRequestDto.getTittle())
            .lawType(lawType)
            .referenceNumber(lawRequestDto.getReferenceNumber())
            .dateline(lawRequestDto.getDateline())
            .issueDate(lawRequestDto.getIssueDate())
            .effectiveDate(lawRequestDto.getEffectiveDate())
            .sourceUrl(lawRequestDto.getSourceUrl())
            .filePath(lawRequestDto.getFilePath())
            .isDeleted(lawRequestDto.isDeleted())
            .build();
    }


    private LawResponseDto convertToLawResponseDto(Law law) {
        // Convert Law entity to LawResponseDto
        LawType lawType = law.getLawType();
        LawTypeResponse lawTypeResponse = new LawTypeResponse();
        lawTypeResponse.setId(lawType.getId());
        lawTypeResponse.setName(lawType.getName());
        lawTypeResponse.setDeleted(false); // Assuming you want to set deleted as false for the response
        lawTypeResponse.setCreatedDate(lawType.getCreatedDate());
        lawTypeResponse.setUpdatedDate(lawType.getUpdatedDate());

        LawResponseDto lawResponseDto = new LawResponseDto();
        lawResponseDto.setId(law.getId());
        lawResponseDto.setTittle(law.getTitle());
        lawResponseDto.setIssueDate(law.getIssueDate());
        lawResponseDto.setReferenceNumber(law.getReferenceNumber());
        lawResponseDto.setDateline(law.getDateline());
        lawResponseDto.setEffectiveDate(law.getEffectiveDate());
        lawResponseDto.setSourceUrl(law.getSourceUrl());
        lawResponseDto.setFilePath(law.getFilePath());
        lawResponseDto.setDeleted(law.isDeleted());
        lawResponseDto.setCreatedDate(law.getCreatedDate());
        lawResponseDto.setUpdatedDate(law.getUpdatedDate());
        lawResponseDto.setLawType(lawTypeResponse);
        
        return lawResponseDto;
    }
}
