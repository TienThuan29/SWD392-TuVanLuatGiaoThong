package swd392.userpackageservice.application.usecase;

import java.util.List;
import java.util.UUID;
import swd392.userpackageservice.application.dto.UserPackageResponseDto;
import swd392.userpackageservice.web.dto.UserPackageRequest;

public interface IUserPackageService {
    UserPackageResponseDto createUserPackage(UserPackageRequest userPackageRequest);
    UserPackageResponseDto getUserPackageById(UUID id);
    List<UserPackageResponseDto> getAllUserPackages();
    UserPackageResponseDto updateUserPackage(UUID id, UserPackageRequest userPackageRequest);
    void deleteUserPackage(UUID id);
}
