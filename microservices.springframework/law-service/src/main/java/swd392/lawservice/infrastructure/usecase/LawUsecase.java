package swd392.lawservice.infrastructure.usecase;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import swd392.lawservice.application.dto.ApiResponse;
import swd392.lawservice.application.exception.CustomExceptions;
import swd392.lawservice.application.mapper.LawMapper;
import swd392.lawservice.application.usecase.ILawUsecase;
import swd392.lawservice.web.dto.LawRequest;
import swd392.lawservice.domain.entity.Law;
import swd392.lawservice.domain.entity.LawType;
import swd392.lawservice.domain.repository.ITransactionLaw;
import swd392.lawservice.domain.repository.LawRepository;
import swd392.lawservice.domain.repository.LawTypeRepository;
import swd392.lawservice.application.dto.LawResponse;
import swd392.lawservice.application.dto.LawTypeResponse;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class LawUsecase implements ILawUsecase {

    private ITransactionLaw transactionLaw;
    private LawRepository lawRepository;
    private LawTypeRepository lawTypeRepository;
    private LawMapper lawMapper;

    @Override
    public ApiResponse<LawResponse> deactivateLaw(UUID id) {
        Law law = this.lawRepository.findById(id)
                .orElseThrow(() -> new CustomExceptions.ResourceNotFoundException("Law not found with id: " + id));
        law.setDeleted(true);
        this.transactionLaw.update(law);
        return ApiResponse.<LawResponse>builder()
                .status("success")
                .message("Update law successfully")
                .dataResponse(lawMapper.toResponse(law))
                .build();
    }

    @Override
    public ApiResponse<LawResponse> createLaw(LawRequest lawRequest) {
        try {
            var lawType = this.lawTypeRepository.findById(lawRequest.getLawTypeId())
                    .orElseThrow(() -> new CustomExceptions.ResourceNotFoundException
                            ("Law type not found with id: " + lawRequest.getLawTypeId())
                    );
            var savedLaw = this.transactionLaw.save(this.lawMapper.toEntity(lawRequest, lawType));
            return ApiResponse.<LawResponse>builder()
                    .status("success")
                    .message("Create law successfully!")
                    .dataResponse(lawMapper.toResponse(savedLaw))
                    .build();
        }
        catch (Exception exception) {
            throw new CustomExceptions.InternalServerException(exception.getMessage());
        }
    }

    @Override
    public ApiResponse<LawResponse> updateLaw(UUID id, LawRequest lawRequest) {
        try {
            var law = this.lawRepository.findById(id)
                    .orElseThrow(() -> new CustomExceptions.ResourceNotFoundException(
                            "Law type not found with id: " + lawRequest.getLawTypeId())
                    );
            law = this.lawMapper.copyDataWithoutId(lawRequest, law);
            var updatedLaw = this.transactionLaw.update(law);
            return ApiResponse.<LawResponse>builder()
                    .status("success")
                    .message("Update law successfully!")
                    .dataResponse(this.lawMapper.toResponse(updatedLaw))
                    .build();
        }
        catch (Exception exception) {
            throw new CustomExceptions.InternalServerException(exception.getMessage());
        }
    }

    @Override
    public ApiResponse<List<LawResponse>> getAllLaws() {
        try {
            var laws = this.lawRepository.findAll()
                    .stream().map(this.lawMapper::toResponse).toList();
            return ApiResponse.<List<LawResponse>>builder()
                    .status("success")
                    .message("Get all law data successfully!")
                    .dataResponse(laws)
                    .build();
        }
        catch (Exception exception) {
            throw new CustomExceptions.InternalServerException(exception.getMessage());
        }
    }

    @Override
    public ApiResponse<LawResponse> getLawById(UUID id) {
        var law =  this.lawRepository.findById(id)
                .orElseThrow(() -> new CustomExceptions.ResourceNotFoundException(
                        "Law type not found with id: " + id)
                );
        return ApiResponse.<LawResponse>builder()
                .status("success")
                .message("Get law by id successfully!")
                .dataResponse(this.lawMapper.toResponse(law))
                .build();
    }

    @Override
    public void delete(UUID id) {
        Law law = this.lawRepository.findById(id)
            .orElseThrow(() -> new IllegalArgumentException("Law not found with id: " + id));
        law.setDeleted(true);
        this.transactionLaw.update(law);
    }

    @Override
    public LawResponse update(UUID id, LawRequest lawRequest) {
        // TODO Auto-generated method stub
        Law law = lawRepository.findById(id)
            .orElseThrow(() -> new IllegalArgumentException("Law not found with id: " + id));
        LawType lawType = lawTypeRepository.findById(lawRequest.getLawTypeId())
            .orElseThrow(() -> new IllegalArgumentException("LawType not found with id: " + lawRequest.getLawTypeId()));

        law.setTitle(lawRequest.getTittle());
        law.setLawType(lawType);
        law.setReferenceNumber(lawRequest.getReferenceNumber());
        law.setDateline(lawRequest.getDateline());
        law.setIssueDate(lawRequest.getIssueDate());
        law.setEffectiveDate(lawRequest.getEffectiveDate());
        law.setSourceUrl(lawRequest.getSourceUrl());
        law.setFilePath(lawRequest.getFilePath());
        law.setDeleted(lawRequest.isDeleted());
        transactionLaw.save(law);
        return convertToLawResponseDto(law);
    }


    @Override
    public List<LawResponse> getAllLaw() {
        // TODO Auto-generated method stub
        List<Law> laws = lawRepository.findAll();
        List<LawResponse> lawResponseDtos = laws.stream().map(law -> {
            return convertToLawResponseDto(law);
        }).toList();
        return lawResponseDtos;
    }


    

    private Law convertToLawEntity(LawRequest lawRequest) {
        // Convert LawRequestDto to Law entity
        LawType lawType = lawTypeRepository.findById(lawRequest.getLawTypeId())
            .orElseThrow(() -> new IllegalArgumentException("LawType not found with id: " + lawRequest.getLawTypeId()));
        
        return Law.builder()
            .title(lawRequest.getTittle())
            .lawType(lawType)
            .referenceNumber(lawRequest.getReferenceNumber())
            .dateline(lawRequest.getDateline())
            .issueDate(lawRequest.getIssueDate())
            .effectiveDate(lawRequest.getEffectiveDate())
            .sourceUrl(lawRequest.getSourceUrl())
            .filePath(lawRequest.getFilePath())
            .isDeleted(lawRequest.isDeleted())
            .build();
    }


    private LawResponse convertToLawResponseDto(Law law) {
        // Convert Law entity to LawResponseDto
        LawType lawType = law.getLawType();
        LawTypeResponse lawTypeResponse = new LawTypeResponse();
        lawTypeResponse.setId(lawType.getId());
        lawTypeResponse.setName(lawType.getName());
        lawTypeResponse.setDeleted(false); // Assuming you want to set deleted as false for the response
        lawTypeResponse.setCreatedDate(lawType.getCreatedDate());
        lawTypeResponse.setUpdatedDate(lawType.getUpdatedDate());

        LawResponse lawResponseDto = new LawResponse();
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
