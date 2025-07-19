package swd392.userpackageservice.infrastructure.transaction;

import java.util.UUID;
import swd392.userpackageservice.domain.entity.UserPackage;

public interface IUserPackageTransaction {
    UserPackage save(UserPackage userPackage);
    void delete(UUID id);
    void disableAllOldPackageOfUser(UUID userId);
}
