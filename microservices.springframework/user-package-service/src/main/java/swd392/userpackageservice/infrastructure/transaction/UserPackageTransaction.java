package swd392.userpackageservice.infrastructure.transaction;

import java.util.List;
import java.util.UUID;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import swd392.userpackageservice.domain.entity.UserPackage;
import swd392.userpackageservice.domain.repository.UserPackageRepository;

@Service
@Transactional
@RequiredArgsConstructor
public class UserPackageTransaction implements IUserPackageTransaction {

    private final UserPackageRepository userPackageRepository;

    @Override
    public UserPackage save(UserPackage userPackage) {
        return userPackageRepository.save(userPackage);
    }

    @Override
    public void delete(UUID id) {
        userPackageRepository.deleteById(id);
    }

    @Override
    public void disableAllOldPackageOfUser(UUID userId) {
        List<UserPackage> oldPackages = userPackageRepository.findByUserId(userId);
        for (UserPackage oldPackage : oldPackages) {
            if (oldPackage.isEnable()) {
                oldPackage.setEnable(Boolean.FALSE);
                userPackageRepository.save(oldPackage);
            }
        }
    }
}
