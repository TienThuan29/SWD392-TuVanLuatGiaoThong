package swd392.lawservice.web.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import swd392.lawservice.web.dto.LawRequestDto;
import swd392.lawservice.application.dto.ApiResponse;
import swd392.lawservice.application.usecase.ILawService;

import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@RequestMapping("/api/v1/law")
public class LawController {

    @Autowired
    private ILawService iUsecase;
    @GetMapping("/health")
    public String healthCheck() {
        return "Law Service is running";
    }
    

    @PostMapping("/create")
public ResponseEntity<ApiResponse<?>> createLaw(@RequestBody LawRequestDto lawRequestDto) {
    // Logic to create a law
    return new ResponseEntity<>(
        ApiResponse.builder()
            .status("success")
            .message("Law created successfully")
            .dataResponse(iUsecase.createLaw(lawRequestDto))
            .build(),
        HttpStatus.OK
    );
}

    
    @PutMapping("/update/{id}")
    public ApiResponse<?> updateLaw(@PathVariable UUID id,@RequestBody LawRequestDto lawRequestDto) {
        // Logic to update a law
        return ApiResponse.builder()
                .status("success")
                .message("Law updated successfully")
                .dataResponse(iUsecase.update(id, lawRequestDto))
                .build();
    }

    @GetMapping("/get/{id}")
    public ResponseEntity<ApiResponse<?>> getLawById(@PathVariable UUID id) {
        // Logic to get a law by ID
        return new ResponseEntity<>(
            ApiResponse.builder()
                .status("success")
                .message("Law retrieved successfully")
                .dataResponse(iUsecase.getLawById(id))
                .build(),
            HttpStatus.OK
        );
    }

    @GetMapping("/getAll")
    public ResponseEntity<ApiResponse<?>> getAllLaw() {
        // Logic to get all laws
        return new ResponseEntity<>(
            ApiResponse.builder()
                .status("success")
                .message("All laws retrieved successfully")
                .dataResponse(iUsecase.getAllLaw())
                .build(),
            HttpStatus.OK
        );
    }

    @PostMapping("/delete/{id}")
    public ResponseEntity<ApiResponse<?>> deleteLaw(@PathVariable UUID id) {
        // Logic to delete a law
        iUsecase.delete(id);
        return new ResponseEntity<>(
            ApiResponse.builder()
                .status("success")
                .message("Law deleted successfully")
                .build(),
            HttpStatus.OK
        );
    }

    

}
