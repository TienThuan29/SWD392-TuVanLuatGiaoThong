package swd392.userpackageservice.domain.repository;

import java.util.UUID;

import swd392.userpackageservice.domain.entity.UserPackage;

public interface ITransactionUserPackage {
    UserPackage save(UserPackage userPackage);
    void delete(UUID id);
}
