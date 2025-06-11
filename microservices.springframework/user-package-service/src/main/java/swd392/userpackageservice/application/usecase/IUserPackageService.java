package swd392.userpackageservice.application.usecase;

import java.util.List;
import java.util.UUID;


import swd392.userpackageservice.application.dto.UserPackageResponseDto;
import swd392.userpackageservice.web.dto.UserPackageRequestDto;

public interface IUserPackageService {
    UserPackageResponseDto createUserPackage(UserPackageRequestDto userPackageRequestDto);
    UserPackageResponseDto getUserPackageById(UUID id);
    List<UserPackageResponseDto> getAllUserPackages();
    UserPackageResponseDto updateUserPackage(UUID id, UserPackageRequestDto userPackageRequestDto);
    void deleteUserPackage(UUID id);
}
