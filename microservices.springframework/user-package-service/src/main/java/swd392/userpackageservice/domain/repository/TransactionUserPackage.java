package swd392.userpackageservice.domain.repository;

import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import swd392.userpackageservice.domain.entity.UserPackage;

@Component
public class TransactionUserPackage implements ITransactionUserPackage{
    
    @Autowired
    private UserPackageRepository userPackageRepository;

    @Override
    public UserPackage save(UserPackage userPackage) {
        return userPackageRepository.save(userPackage);
    }

    @Override
    public void delete(UUID id) {
        userPackageRepository.deleteById(id);
    }
}
