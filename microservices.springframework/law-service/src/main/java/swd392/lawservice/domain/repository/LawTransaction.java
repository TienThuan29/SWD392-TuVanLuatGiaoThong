package swd392.lawservice.domain.repository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import swd392.lawservice.domain.entity.Law;

import java.util.UUID;

@Component
public class LawTransaction implements ITransactionLaw{

    @Autowired
    private LawRepository lawRepository;

    @Override
    public void commitTransaction() {
        // Logic to commit the transaction
        System.out.println("Transaction committed.");
    }

    @Override
    public void rollbackTransaction() {
        // Logic to rollback the transaction
        System.out.println("Transaction rolled back.");
    }

    @Override
    public void save(Law law) {
        lawRepository.save(law);
    }
    @Override
    public void update(Law law) {
        lawRepository.save(law);
        System.out.println("Law updated: " + law);
    }
    @Override
    public void delete(UUID lawId) {
        // Logic to delete the law entity
        lawRepository.deleteById(lawId);
        System.out.println("Law deleted: " + lawId);
    }

}
