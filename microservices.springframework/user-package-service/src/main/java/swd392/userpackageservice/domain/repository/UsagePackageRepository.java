package swd392.userpackageservice.domain.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import swd392.userpackageservice.domain.entity.UsagePackage;
import java.util.UUID;

@Repository
public interface UsagePackageRepository extends JpaRepository<UsagePackage, UUID> {
}
