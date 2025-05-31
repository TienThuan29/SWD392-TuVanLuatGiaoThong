package swd392.lawservice.domain.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import swd392.lawservice.domain.entity.Law;

import java.util.UUID;

@Repository
public interface LawRepository extends JpaRepository<Law, UUID> {
    
}
