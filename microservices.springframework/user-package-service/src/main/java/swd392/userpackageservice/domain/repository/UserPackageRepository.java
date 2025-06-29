package swd392.userpackageservice.domain.repository;

import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import swd392.userpackageservice.domain.entity.UserPackage;

@Repository
public interface UserPackageRepository extends JpaRepository<UserPackage, UUID> {

    Optional<UserPackage> findByUserId(UUID userId);

}
