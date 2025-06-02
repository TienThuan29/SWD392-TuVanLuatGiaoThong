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
        // TODO Auto-generated method stub
        law = lawRepository.save(law);
        throw new UnsupportedOperationException("Unimplemented method 'save'");
    }

    @Override
    public void update(Law law) {
        // TODO Auto-generated method stub
        lawRepository.save(law);
        throw new UnsupportedOperationException("Unimplemented method 'update'");
    }

    @Override
    public void delete(UUID lawId) {
        // TODO Auto-generated method stub
        lawRepository.deleteById(lawId);
        throw new UnsupportedOperationException("Unimplemented method 'delete'");
    }

    

}
