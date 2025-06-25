package swd392.lawservice.domain.repository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import swd392.lawservice.domain.entity.Law;
import java.util.UUID;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class LawTransaction implements ITransactionLaw {

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
    public Law save(Law law) {
        // TODO Auto-generated method stub
        return lawRepository.save(law);
    }

    @Override
    public Law update(Law law) {
        // TODO Auto-generated method stub
        lawRepository.save(law);
        throw new UnsupportedOperationException("Unimplemented method 'update'");
    }

    @Override
    public boolean delete(UUID lawId) {
        // TODO Auto-generated method stub
        lawRepository.deleteById(lawId);
        throw new UnsupportedOperationException("Unimplemented method 'delete'");
    }

}
