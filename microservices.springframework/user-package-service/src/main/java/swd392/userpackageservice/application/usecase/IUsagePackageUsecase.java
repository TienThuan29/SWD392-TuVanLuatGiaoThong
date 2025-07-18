package swd392.userpackageservice.application.usecase;

import swd392.userpackageservice.application.dto.ApiResponse;
import swd392.userpackageservice.application.dto.UsagePackageResponse;
import swd392.userpackageservice.web.dto.UsagePackageRequest;
import java.util.List;
import java.util.UUID;

public interface IUsagePackageUsecase {

    public ApiResponse<UsagePackageResponse> createUsagePackage(UsagePackageRequest usagePackageRequest);

    public ApiResponse<UsagePackageResponse> updateUsagePackage(UUID id, UsagePackageRequest usagePackageRequest);

    public ApiResponse<List<UsagePackageResponse>> getAllUsagePackage();

    public ApiResponse<UsagePackageResponse> getUsagePackageById(UUID id);

    public ApiResponse<UsagePackageResponse> getUsagePackageByUserId(String userId);

    public ApiResponse<UsagePackageResponse> deactivateUsagePackage(UUID id);

    public ApiResponse<UsagePackageResponse> getCurrentUsagePackageByUserId(String userId);
}
