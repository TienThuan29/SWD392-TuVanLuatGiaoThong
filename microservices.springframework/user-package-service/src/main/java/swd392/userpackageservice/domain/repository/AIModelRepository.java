package swd392.userpackageservice.domain.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import swd392.userpackageservice.domain.entity.AIModel;

@Repository
public interface AIModelRepository extends JpaRepository<AIModel, Long> {
}
