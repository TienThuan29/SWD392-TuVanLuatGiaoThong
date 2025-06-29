package swd392.userpackageservice.web.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import swd392.userpackageservice.application.dto.ApiResponse;
import swd392.userpackageservice.application.usecase.IUsagePackageUsecase;
import swd392.userpackageservice.web.dto.UsagePackageRequest;
import java.util.UUID;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/user-packages/usage-package")
public class UsagePackageController {

    private final IUsagePackageUsecase usagePackageUsecase;

    @PostMapping("/admin/create")
    public ResponseEntity<ApiResponse<?>> createUsagePackage(@RequestBody UsagePackageRequest usagePackageRequest) {
        return new ResponseEntity<>(this.usagePackageUsecase.createUsagePackage(usagePackageRequest), HttpStatus.CREATED);
    }

    @PutMapping("/admin/update/{id}")
    public ResponseEntity<ApiResponse<?>> updateUsagePackage(
           @PathVariable("id") UUID id, @RequestBody UsagePackageRequest usagePackageRequest
    ) {
        return new ResponseEntity<>(this.usagePackageUsecase.updateUsagePackage(id, usagePackageRequest), HttpStatus.OK);
    }

    @PutMapping("/admin/deactivate/{id}")
    public ResponseEntity<ApiResponse<?>> deactivateUsagePackage(@PathVariable("id") UUID id ) {
        return new ResponseEntity<>(this.usagePackageUsecase.deactivateUsagePackage(id), HttpStatus.OK);
    }

    @GetMapping("/get-all")
    public ResponseEntity<ApiResponse<?>> getAllUsagePackages() {
        return new ResponseEntity<>(this.usagePackageUsecase.getAllUsagePackage(), HttpStatus.OK);
    }

    @GetMapping("/get/{id}")
    public ResponseEntity<ApiResponse<?>> getUsagePackageById(@PathVariable("id") UUID id) {
        return new ResponseEntity<>(this.usagePackageUsecase.getUsagePackageById(id), HttpStatus.OK);
    }

}
