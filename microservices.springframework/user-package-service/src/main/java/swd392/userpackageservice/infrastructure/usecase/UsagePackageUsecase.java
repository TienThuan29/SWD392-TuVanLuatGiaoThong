package swd392.userpackageservice.infrastructure.usecase;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import swd392.userpackageservice.application.dto.ApiResponse;
import swd392.userpackageservice.application.dto.UsagePackageResponse;
import swd392.userpackageservice.application.exception.CustomExceptions;
import swd392.userpackageservice.application.mapper.UsagePackageMapper;
import swd392.userpackageservice.application.usecase.IUsagePackageUsecase;
import swd392.userpackageservice.domain.entity.UserPackage;
import swd392.userpackageservice.domain.repository.ITransactionUsagePackage;
import swd392.userpackageservice.domain.repository.UsagePackageRepository;
import swd392.userpackageservice.domain.repository.UserPackageRepository;
import swd392.userpackageservice.infrastructure.utils.HashingUtil;
import swd392.userpackageservice.web.dto.UsagePackageRequest;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class UsagePackageUsecase implements IUsagePackageUsecase {

    private final UsagePackageRepository usagePackageRepository;

    private final ITransactionUsagePackage transactionUsagePackage;

    private final UsagePackageMapper usagePackageMapper;

    private final UserPackageRepository userPackageRepository;

    private final HashingUtil hashingUtil;

    @Override
    public ApiResponse<UsagePackageResponse> createUsagePackage(UsagePackageRequest usagePackageRequest) {
        try {
            var savedUsagePackage = this.transactionUsagePackage.save(
                    this.usagePackageMapper.toEntity(usagePackageRequest)
            );
            return ApiResponse.<UsagePackageResponse>builder()
                    .status("success")
                    .message("Create usage package successfully!")
                    .dataResponse(this.usagePackageMapper.toResponse(savedUsagePackage))
                    .build();
        }
        catch (Exception exception) {
            throw new CustomExceptions.InternalServerException("Create usage package fail, message: " + exception.getMessage());
        }
    }

    @Override
    public ApiResponse<UsagePackageResponse> updateUsagePackage(UUID id, UsagePackageRequest usagePackageRequest) {
        try {
            var usagePackage = this.usagePackageRepository.findById(id)
                    .orElseThrow(() -> new CustomExceptions.ResourceNotFoundException("Cannot found usage package with id: "+ id));
            usagePackage = this.usagePackageMapper.copyDataWithoutId(usagePackageRequest, usagePackage);
            var updatedUsagePackage = this.transactionUsagePackage.save(usagePackage);
            return ApiResponse.<UsagePackageResponse>builder()
                    .status("success")
                    .message("Update usage package successfully!")
                    .dataResponse(this.usagePackageMapper.toResponse(updatedUsagePackage))
                    .build();
        }
        catch (Exception exception) {
            throw new CustomExceptions.InternalServerException(
                    "Update usage package with id "+ id +" fail, message: " + exception.getMessage()
            );
        }
    }

    @Override
    public ApiResponse<List<UsagePackageResponse>> getAllUsagePackage() {
        try {
            var usagePackages = this.usagePackageRepository.findAll()
                    .stream().map(this.usagePackageMapper::toResponse).toList();
            return ApiResponse.<List<UsagePackageResponse>>builder()
                    .status("success")
                    .message("Get all usage packages successfully!")
                    .dataResponse(usagePackages)
                    .build();
        }
        catch (Exception exception) {
            throw new CustomExceptions.InternalServerException(
                    "Cannot get all usage packages, message: " + exception.getMessage()
            );
        }
    }

    @Override
    public ApiResponse<UsagePackageResponse> getUsagePackageById(UUID id) {
        try {
            var usagePackage = this.usagePackageRepository.findById(id)
                    .orElseThrow(() -> new CustomExceptions.ResourceNotFoundException("Cannot found usage package with id: "+ id));
            return ApiResponse.<UsagePackageResponse>builder()
                    .status("success")
                    .message("Get usage package successfully!")
                    .dataResponse(this.usagePackageMapper.toResponse(usagePackage))
                    .build();
        }
        catch (Exception exception) {
            throw new CustomExceptions.InternalServerException(
                    "Update usage package with id "+ id +" fail, message: " + exception.getMessage()
            );
        }
    }

    @Override
    public ApiResponse<UsagePackageResponse> deactivateUsagePackage(UUID id) {
        try {
            var usagePackage = this.usagePackageRepository.findById(id)
                    .orElseThrow(() -> new CustomExceptions.ResourceNotFoundException("Cannot found usage package with id: "+ id));
            usagePackage.setDeleted(Boolean.TRUE);
            var savedUsagePackage = this.transactionUsagePackage.save(usagePackage);
            return ApiResponse.<UsagePackageResponse>builder()
                    .status("success")
                    .message("Get usage package successfully!")
                    .dataResponse(this.usagePackageMapper.toResponse(savedUsagePackage))
                    .build();
        }
        catch (Exception exception) {
            throw new CustomExceptions.InternalServerException(
                    "Update usage package with id "+ id +" fail, message: " + exception.getMessage()
            );
        }
    }

    @Override
    public ApiResponse<UsagePackageResponse> getCurrentUsagePackageByUserId(String userId) {
        UUID decodedUserId = UUID.fromString(this.hashingUtil.decode(userId));
        var userPackageOptional = this.userPackageRepository.findByUserIdAndIsEnable(decodedUserId, true);
        UsagePackageResponse usagePackageResponse = null;

        if (userPackageOptional.isPresent()) {
            var userPackage = userPackageOptional.get();
            usagePackageResponse = this.usagePackageMapper.toResponse(
                    this.usagePackageRepository.findById(userPackage.getPackageId()).orElseThrow(
                            () -> new CustomExceptions.ResourceNotFoundException(
                                    "Cannot found usage package with id: " + userPackage.getPackageId())
                    )
            );
        }
        return ApiResponse.<UsagePackageResponse>builder()
                .status("success")
                .message("Get current usage package by user id successfully!")
                .dataResponse(usagePackageResponse)
                .build();
    }
}
