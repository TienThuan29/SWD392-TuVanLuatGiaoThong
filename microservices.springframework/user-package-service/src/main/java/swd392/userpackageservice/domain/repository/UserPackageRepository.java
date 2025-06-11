package swd392.userpackageservice.domain.repository;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import swd392.userpackageservice.domain.entity.UserPackage;

@Repository
public interface UserPackageRepository extends JpaRepository<UserPackage, UUID> {
    // Additional query methods can be defined here if needed
    
}
