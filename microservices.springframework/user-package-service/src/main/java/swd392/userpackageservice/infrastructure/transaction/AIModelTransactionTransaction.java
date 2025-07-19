package swd392.userpackageservice.infrastructure.transaction;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import swd392.userpackageservice.domain.entity.AIModel;
import swd392.userpackageservice.domain.repository.AIModelRepository;

@Service
@Transactional
@RequiredArgsConstructor
public class AIModelTransactionTransaction implements IAIModelTransaction {

    private final AIModelRepository aiModelRepository;

    @Override
    public AIModel save(AIModel aiModel) {
        return aiModelRepository.save(aiModel);
    }
}
