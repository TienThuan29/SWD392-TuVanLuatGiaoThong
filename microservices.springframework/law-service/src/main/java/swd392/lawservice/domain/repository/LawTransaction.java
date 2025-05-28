package swd392.lawservice.domain.repository;

public class LawTransaction implements ITransactionLaw{

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
    
}
