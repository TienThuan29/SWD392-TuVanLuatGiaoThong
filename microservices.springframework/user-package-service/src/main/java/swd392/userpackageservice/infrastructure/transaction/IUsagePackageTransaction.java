package swd392.userpackageservice.infrastructure.transaction;

import swd392.userpackageservice.domain.entity.UsagePackage;
import java.util.UUID;

public interface IUsagePackageTransaction {

    public UsagePackage save(UsagePackage usagePackage);

    public void delete(UUID id);

}
