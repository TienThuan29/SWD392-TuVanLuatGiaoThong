package swd392.userpackageservice.domain.repository;

import swd392.userpackageservice.domain.entity.UsagePackage;

import java.util.UUID;

public interface ITransactionUsagePackage {

    public UsagePackage save(UsagePackage usagePackage);

    public void delete(UUID id);

}
