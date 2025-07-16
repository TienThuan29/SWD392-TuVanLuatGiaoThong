package swd392.userpackageservice.application.usecase;

import swd392.userpackageservice.application.dto.AIModelResponse;
import swd392.userpackageservice.application.dto.ApiResponse;
import swd392.userpackageservice.web.dto.AIModelRequest;

import java.util.List;

public interface IAIModelUsecase {

    public ApiResponse<AIModelResponse> createAIModel(AIModelRequest aiModelRequest);

    public ApiResponse<List<AIModelResponse>> getAllAIModel();
}
