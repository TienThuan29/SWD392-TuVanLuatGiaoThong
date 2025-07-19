package swd392.lawservice.infrastructure.transaction;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import swd392.lawservice.domain.entity.LawType;
import swd392.lawservice.domain.repository.LawTypeRepository;

@Service
@Transactional
@RequiredArgsConstructor
public class LawTypeTransaction implements ILawTypeTransaction {

    private final LawTypeRepository lawTypeRepository;

    @Override
    public LawType save(LawType lawType) {
        return this.lawTypeRepository.save(lawType);
    }
}
