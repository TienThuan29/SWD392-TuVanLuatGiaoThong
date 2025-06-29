package swd392.userpackageservice.infrastructure.usecase;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import swd392.userpackageservice.application.dto.UserPackageResponse;
import swd392.userpackageservice.application.exception.CustomExceptions;
import swd392.userpackageservice.application.usecase.IUserPackageService;
import swd392.userpackageservice.domain.entity.UserPackage;
 import swd392.userpackageservice.domain.repository.ITransactionUserPackage;
import swd392.userpackageservice.domain.repository.UserPackageRepository;
import swd392.userpackageservice.web.dto.UserPackageRequest;

@Service
@RequiredArgsConstructor
public class UserPackageServiceImpl implements IUserPackageService {

    private UserPackageRepository userPackageRepository;

    private ITransactionUserPackage transactionUserPackage;

    @Override
    public UserPackageResponse createUserPackage(UserPackageRequest requestDto) {
        UserPackage userPackage = new UserPackage();
        userPackage.setUserId(requestDto.getUserId());
        userPackage.setPackageId(requestDto.getPackageId());
        userPackage.setPrice(requestDto.getPrice());
        this.userPackageRepository.save(userPackage);
        return convertToResponseDto(userPackage);
    }

    @Override
    public UserPackageResponse getUserPackageById(UUID id) {
        UserPackage userPackage = this.userPackageRepository.findById(id)
                .orElseThrow(() -> new CustomExceptions.ResourceNotFoundException("UserPackage not found with id: " + id));
        return convertToResponseDto(userPackage);
    }

    @Override
    public UserPackageResponse getUserPackageByUserId(UUID userId) {
        try {
            UserPackage userPackage = this.userPackageRepository.findByUserId(userId)
                    .orElseThrow(() -> new CustomExceptions.ResourceNotFoundException("User package not found with user id: " + userId));
            return convertToResponseDto(userPackage);
        }
        catch (Exception exception) {
            return null;
        }
    }

    @Override
    public List<UserPackageResponse> getAllUserPackages() {
        List<UserPackage> userPackages = userPackageRepository.findAll();
        return userPackages.stream()
                .map(this::convertToResponseDto)
                .collect(Collectors.toList());
    }

    @Override
    public UserPackageResponse updateUserPackage(UUID id, UserPackageRequest requestDto) {
        UserPackage userPackage = this.userPackageRepository.findById(id)
                .orElseThrow(() -> new CustomExceptions.ResourceNotFoundException("UserPackage not found with id: " + id));
        userPackage.setUserId(requestDto.getUserId());
        userPackage.setPackageId(requestDto.getPackageId());
        userPackage.setPrice(requestDto.getPrice());
        this.transactionUserPackage.save(userPackage);
        return convertToResponseDto(userPackage);
    }

    @Override
    public void deleteUserPackage(UUID id) {
        UserPackage userPackage = this.userPackageRepository.findById(id)
                .orElseThrow(() -> new CustomExceptions.ResourceNotFoundException("UserPackage not found with id: " + id));
        try {
            this.transactionUserPackage.delete(id);
        }
        catch (Exception exception) {
            throw new CustomExceptions.InternalServerException("Delete user package fail with id: "+ id);
        }
    }

    private UserPackageResponse convertToResponseDto(UserPackage userPackage) {
        return UserPackageResponse.builder()
                .id(userPackage.getId())
                .userId(userPackage.getUserId())
                .packageId(userPackage.getPackageId())
                .price(userPackage.getPrice())
                .transactionDate(userPackage.getTransactionDate())
                .build();
    }
    
}
