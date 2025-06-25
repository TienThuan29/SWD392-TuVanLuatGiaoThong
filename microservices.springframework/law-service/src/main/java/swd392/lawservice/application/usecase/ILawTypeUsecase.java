package swd392.lawservice.application.usecase;

import swd392.lawservice.application.dto.ApiResponse;
import swd392.lawservice.application.dto.LawTypeResponse;
import swd392.lawservice.web.dto.LawTypeRequest;

import java.util.List;
import java.util.UUID;

public interface ILawTypeUsecase {

    public ApiResponse<LawTypeResponse> createLawType(LawTypeRequest lawTypeRequest);
    public ApiResponse<List<LawTypeResponse>> getAllLawTypes();
    public ApiResponse<LawTypeResponse> updateLawTypes(UUID id, LawTypeRequest lawTypeRequest);
    public ApiResponse<LawTypeResponse> deactivateLawType(UUID id);
    public ApiResponse<LawTypeResponse> getLawTypeById(UUID id);

}
