package swd392.lawservice.application.mapper;

import org.springframework.stereotype.Component;
import swd392.lawservice.application.dto.LawTypeResponse;
import swd392.lawservice.domain.entity.LawType;
import swd392.lawservice.web.dto.LawTypeRequest;

@Component("lawTypeMapper_LawService")
public class LawTypeMapper {

    public LawType toEntity(LawTypeRequest lawTypeRequest) {
        if (lawTypeRequest == null) return null;
        return LawType.builder()
                .name(lawTypeRequest.getName())
                .isDeleted(Boolean.FALSE)
                .build();
    }

    public LawTypeResponse toResponse(LawType lawType) {
        if (lawType == null)
            return null;
        LawTypeResponse response = new LawTypeResponse();
        response.setId(lawType.getId());
        response.setName(lawType.getName());
        response.setDeleted(lawType.isDeleted());
        response.setCreatedDate(lawType.getCreatedDate());
        response.setUpdatedDate(lawType.getUpdatedDate());
        return response;
    }

    public LawType copyWithoutId(LawTypeRequest lawTypeRequest, LawType lawType) {
        if (lawTypeRequest == null || lawType == null) {
            return null;
        }
        lawType.setName(lawType.getName());
        return lawType;
    }

}
