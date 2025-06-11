package swd392.userpackageservice.infrastructure.usecase;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import swd392.userpackageservice.application.dto.UserPackageResponseDto;
import swd392.userpackageservice.application.usecase.IUserPackageService;
import swd392.userpackageservice.domain.entity.UserPackage;
// import swd392.userpackageservice.domain.repository.ITransactionUserPackage;
import swd392.userpackageservice.domain.repository.UserPackageRepository;
import swd392.userpackageservice.web.dto.UserPackageRequestDto;

@Service
public class UserPackageServiceImpl implements IUserPackageService {

    @Autowired
    private UserPackageRepository userPackageRepository;

    // @Autowired
    // private ITransactionUserPackage iTransactionUserPackage;

    @Override
    public UserPackageResponseDto createUserPackage(UserPackageRequestDto requestDto) {
        UserPackage userPackage = new UserPackage();
        userPackage.setUserId(requestDto.getUserId());
        userPackage.setPackageId(requestDto.getPackageId());
        userPackage.setPrice(requestDto.getPrice());
        userPackageRepository.save(userPackage);
        return convertToResponseDto(userPackage);
    }

    @Override
    public UserPackageResponseDto getUserPackageById(UUID id) {
        UserPackage userPackage = userPackageRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("UserPackage not found with id: " + id));
        return convertToResponseDto(userPackage);
    }

    @Override
    public List<UserPackageResponseDto> getAllUserPackages() {
        List<UserPackage> userPackages = userPackageRepository.findAll();
        return userPackages.stream()
                .map(this::convertToResponseDto)
                .collect(Collectors.toList());
    }

    @Override
    public UserPackageResponseDto updateUserPackage(UUID id, UserPackageRequestDto requestDto) {
        UserPackage userPackage = userPackageRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("UserPackage not found with id: " + id));
        userPackage.setUserId(requestDto.getUserId());
        userPackage.setPackageId(requestDto.getPackageId());
        userPackage.setPrice(requestDto.getPrice());
        userPackageRepository.save(userPackage);
        return convertToResponseDto(userPackage);
    }

    @Override
    public void deleteUserPackage(UUID id) {
        UserPackage userPackage = userPackageRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("UserPackage not found with id: " + id));
        userPackageRepository.delete(userPackage);
    }

    private UserPackageResponseDto convertToResponseDto(UserPackage userPackage) {
        return UserPackageResponseDto.builder()
                .id(userPackage.getId())
                .userId(userPackage.getUserId())
                .packageId(userPackage.getPackageId())
                .price(userPackage.getPrice())
                .transactionDate(userPackage.getTransactionDate())
                .build();
    }
    
}
