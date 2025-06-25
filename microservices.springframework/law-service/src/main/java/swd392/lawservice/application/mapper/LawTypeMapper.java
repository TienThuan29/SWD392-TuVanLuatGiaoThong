package swd392.lawservice.application.mapper;

import org.springframework.stereotype.Component;
import swd392.lawservice.application.dto.LawTypeResponse;
import swd392.lawservice.domain.entity.LawType;

@Component("lawTypeMapper_LawService")
public class LawTypeMapper {

    public LawTypeResponse toResponse(LawType lawType) {
        if (lawType == null) {
            return null;
        }

        LawTypeResponse response = new LawTypeResponse();
        response.setId(lawType.getId());
        response.setName(lawType.getName());
        response.setDeleted(lawType.isDeleted());
        response.setCreatedDate(lawType.getCreatedDate());
        response.setUpdatedDate(lawType.getUpdatedDate());

        return response;
    }

}
