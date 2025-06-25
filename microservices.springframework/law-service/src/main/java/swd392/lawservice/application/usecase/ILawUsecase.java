package swd392.lawservice.application.usecase;

import swd392.lawservice.application.dto.ApiResponse;
import swd392.lawservice.web.dto.LawRequest;
import swd392.lawservice.application.dto.LawResponse;
import java.util.List;
import java.util.UUID;

public interface ILawUsecase {
    public ApiResponse<LawResponse> createLaw(LawRequest lawRequest);
    public ApiResponse<LawResponse> deactivateLaw(UUID id);
    public ApiResponse<List<LawResponse>> getAllLaws();
    public ApiResponse<LawResponse> updateLaw(UUID id, LawRequest lawRequest);
    public ApiResponse<LawResponse> getLawById(UUID id);
    List<LawResponse> getAllLaw();
    LawResponse update(UUID id, LawRequest lawRequest);
    void delete(UUID id);
}