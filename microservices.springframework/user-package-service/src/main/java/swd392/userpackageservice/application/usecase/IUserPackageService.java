package swd392.userpackageservice.application.usecase;

import java.util.List;
import java.util.UUID;
import swd392.userpackageservice.application.dto.UserPackageResponse;
import swd392.userpackageservice.web.dto.UserPackageRequest;

public interface IUserPackageService {
    UserPackageResponse createUserPackage(UserPackageRequest userPackageRequest);
    UserPackageResponse getUserPackageById(UUID id);
    UserPackageResponse getUserPackageByUserId(UUID userId);
    List<UserPackageResponse> getAllUserPackages();
    UserPackageResponse updateUserPackage(UUID id, UserPackageRequest userPackageRequest);
    void deleteUserPackage(UUID id);
}
