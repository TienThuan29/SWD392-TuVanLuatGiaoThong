package swd392.lawservice.web.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import swd392.lawservice.web.dto.LawRequestDto;
import swd392.lawservice.application.dto.ApiResponse;
import swd392.lawservice.application.usecase.IUsecase;

import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@RequestMapping("/api/v1/law")
public class LawConrtoller {

    @Autowired
    private IUsecase iUsecase;
    
    @GetMapping("'/health")
    public String healthCheck() {
        return "Law Service is running";
    }

    @PostMapping("/create")
    public ApiResponse<?> createLaw(@RequestBody LawRequestDto lawRequestDto) {
        // Logic to create a law
        return ApiResponse.builder()
                .status("success")
                .message("Law created successfully")
                .dataResponse(iUsecase.createLaw(lawRequestDto))
                .build();
        
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

}
