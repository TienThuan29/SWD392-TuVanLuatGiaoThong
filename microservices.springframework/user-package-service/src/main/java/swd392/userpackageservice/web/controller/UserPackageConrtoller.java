package swd392.userpackageservice.web.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import swd392.userpackageservice.application.dto.ApiResponse;
import swd392.userpackageservice.application.dto.UserPackageResponseDto;
import swd392.userpackageservice.application.usecase.IUserPackageService;
import swd392.userpackageservice.web.dto.UserPackageRequestDto;

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
@RequestMapping("/api/v1/user-packages")
public class UserPackageConrtoller {
    
    @Autowired
    private IUserPackageService userPackageService;

    @GetMapping("/health")
    public String healthCheck() {
        return "User Package Service is running!";
    }

    @PostMapping("/create")
    public ResponseEntity<ApiResponse<?>> createUserPackage(@RequestBody UserPackageRequestDto userPackageRequestDto) {
        UserPackageResponseDto responseDto = userPackageService.createUserPackage(userPackageRequestDto);
        return new ResponseEntity<>(
            ApiResponse.builder()
                .status("success")
                .message("User package created successfully")
                .dataResponse(responseDto)
                .build(),
            HttpStatus.CREATED
        );
    }

    @GetMapping("/get/{id}")
    public ResponseEntity<ApiResponse<?>> getUserPackageById(@PathVariable UUID id) {
        UserPackageResponseDto responseDto = userPackageService.getUserPackageById(id);
        return new ResponseEntity<>(
            ApiResponse.builder()
                .status("success")
                .message("User package retrieved successfully")
                .dataResponse(responseDto)
                .build(),
            HttpStatus.OK
        );
    }

    @GetMapping("/getAll")
    public ResponseEntity<ApiResponse<?>> getAllUserPackages() {
        var responseDtoList = userPackageService.getAllUserPackages();
        return new ResponseEntity<>(
            ApiResponse.builder()
                .status("success")
                .message("All user packages retrieved successfully")
                .dataResponse(responseDtoList)
                .build(),
            HttpStatus.OK
        );
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<ApiResponse<?>> updateUserPackage(@PathVariable UUID id, @RequestBody UserPackageRequestDto userPackageRequestDto) {
        UserPackageResponseDto responseDto = userPackageService.updateUserPackage(id, userPackageRequestDto);
        return new ResponseEntity<>(
            ApiResponse.builder()
                .status("success")
                .message("User package updated successfully")
                .dataResponse(responseDto)
                .build(),
            HttpStatus.OK
        );
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<ApiResponse<?>> deleteUserPackage(@PathVariable UUID id) {
        userPackageService.deleteUserPackage(id);
        return new ResponseEntity<>(
            ApiResponse.builder()
                .status("success")
                .message("User package deleted successfully")
                .build(),
            HttpStatus.OK
        );
    }
    

}
