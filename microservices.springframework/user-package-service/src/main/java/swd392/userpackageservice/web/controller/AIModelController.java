package swd392.userpackageservice.web.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import swd392.userpackageservice.application.dto.ApiResponse;
import swd392.userpackageservice.application.usecase.IAIModelUsecase;
import swd392.userpackageservice.web.dto.AIModelRequest;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/user-packages/ai-models")
public class AIModelController {

    private final IAIModelUsecase aiModelUsecase;

    @PostMapping("/admin/create")
    public ResponseEntity<ApiResponse<?>> createAIModel(@RequestBody AIModelRequest aiModelRequest) {
        return new ResponseEntity<>(aiModelUsecase.createAIModel(aiModelRequest), HttpStatus.OK);
    }

    @GetMapping("/get-all")
    public ResponseEntity<ApiResponse<?>> getAllAIModel() {
        return new ResponseEntity<>(aiModelUsecase.getAllAIModel(), HttpStatus.OK);
    }
}
