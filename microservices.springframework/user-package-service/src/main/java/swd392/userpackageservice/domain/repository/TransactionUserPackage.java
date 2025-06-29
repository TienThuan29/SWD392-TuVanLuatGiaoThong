package swd392.userpackageservice.domain.repository;

import java.util.UUID;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import swd392.userpackageservice.domain.entity.UserPackage;

@Service
@Transactional
@RequiredArgsConstructor
public class TransactionUserPackage implements ITransactionUserPackage{

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
