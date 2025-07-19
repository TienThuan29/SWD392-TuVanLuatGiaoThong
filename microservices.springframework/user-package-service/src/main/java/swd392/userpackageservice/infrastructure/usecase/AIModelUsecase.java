package swd392.userpackageservice.infrastructure.usecase;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import swd392.userpackageservice.application.dto.AIModelResponse;
import swd392.userpackageservice.application.dto.ApiResponse;
import swd392.userpackageservice.application.exception.CustomExceptions;
import swd392.userpackageservice.application.mapper.AIModelMapper;
import swd392.userpackageservice.application.usecase.IAIModelUsecase;
import swd392.userpackageservice.domain.repository.AIModelRepository;
import swd392.userpackageservice.infrastructure.transaction.IAIModelTransaction;
import swd392.userpackageservice.web.dto.AIModelRequest;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AIModelUsecase implements IAIModelUsecase {

    private final IAIModelTransaction transactionAIModel;

    private final AIModelMapper aiModelMapper;

    private final AIModelRepository aiModelRepository;

    @Override
    public ApiResponse<AIModelResponse> createAIModel(AIModelRequest aiModelRequest) {
        try {
            var savedAIModel = this.transactionAIModel.save(this.aiModelMapper.toEntity(aiModelRequest));
            return ApiResponse.<AIModelResponse>builder()
                    .status("success")
                    .message("Create AI model successfully")
                    .dataResponse(this.aiModelMapper.toResponse(savedAIModel))
                    .build();

        }
        catch (Exception ex) {
            throw new CustomExceptions.InternalServerException("Failed to create AI model: " + ex.getMessage());
        }
    }

    @Override
    public ApiResponse<List<AIModelResponse>> getAllAIModel() {
        try {
            var aimModels = this.aiModelRepository.findAll().stream().map(
                    this.aiModelMapper::toResponse
            ).toList();
            return ApiResponse.<List<AIModelResponse>>builder()
                    .status("success")
                    .dataResponse(aimModels)
                    .build();
        }
        catch (Exception ex) {
            throw new CustomExceptions.InternalServerException("Failed to get AI models: " + ex.getMessage());
        }
    }

}
