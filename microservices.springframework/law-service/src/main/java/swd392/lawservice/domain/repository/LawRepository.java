package swd392.lawservice.domain.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import swd392.lawservice.domain.entity.Law;

@Repository
public interface LawRepository extends JpaRepository<Law, Long> {
    
}
