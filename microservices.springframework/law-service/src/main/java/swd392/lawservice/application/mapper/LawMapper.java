package swd392.lawservice.application.mapper;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import swd392.lawservice.application.dto.LawResponse;
import swd392.lawservice.domain.entity.Law;
import swd392.lawservice.domain.entity.LawType;
import swd392.lawservice.web.dto.LawRequest;

import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.util.UUID;

@Component("lawMapper_LawService")
@RequiredArgsConstructor
public class LawMapper {

    private final LawTypeMapper lawTypeMapper;

    public LawResponse toResponse(Law law) {
        if (law == null)
            return null;
        LawResponse dto = new LawResponse();
        dto.setId(law.getId());
        dto.setTitle(law.getTitle());
        dto.setReferenceNumber(law.getReferenceNumber());
        dto.setDateline(law.getDateline());
        dto.setIssueDate(law.getIssueDate());
        dto.setEffectiveDate(law.getEffectiveDate());
        dto.setSourceUrl(law.getSourceUrl());
        dto.setFilePath(law.getFilePath());
        dto.setDeleted(law.isDeleted());
        dto.setCreatedDate(law.getCreatedDate());
        dto.setUpdatedDate(law.getUpdatedDate());
        if (law.getLawType() != null) {
            dto.setLawType(this.lawTypeMapper.toResponse(law.getLawType()));
        }
        return dto;
    }

    public Law toEntity(LawRequest request, LawType lawType) {
        if (request == null)
            return null;
        return Law.builder()
                .id(UUID.randomUUID())
                .title(request.getTitle())
                .referenceNumber(request.getReferenceNumber())
                .dateline(request.getDateline())
                .issueDate(request.getIssueDate())
                .effectiveDate(request.getEffectiveDate())
                .sourceUrl(request.getSourceUrl())
                .filePath(request.getFilePath())
                .isDeleted(Boolean.FALSE)
                .lawType(lawType)
                .build();
    }

    public Law copyDataWithoutId(LawRequest lawRequest, Law law) {
        if (lawRequest == null || law == null) {
            return null;
        }
        law.setTitle(lawRequest.getTitle());
        law.setReferenceNumber(lawRequest.getReferenceNumber());
        law.setDateline(lawRequest.getDateline());
        law.setSourceUrl(lawRequest.getSourceUrl());
        law.setFilePath(lawRequest.getFilePath());
        law.setIssueDate(lawRequest.getIssueDate());
        law.setEffectiveDate(lawRequest.getEffectiveDate());
        var zoneId = ZoneId.of("Asia/Ho_Chi_Minh");
        law.setUpdatedDate(ZonedDateTime.now(zoneId).toInstant());

        return law;
    }

}
