package swd392.lawservice.domain.repository;

import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import swd392.lawservice.domain.entity.LawType;

@Repository
public interface LawTypeRepository extends JpaRepository<LawType, UUID> {

}
