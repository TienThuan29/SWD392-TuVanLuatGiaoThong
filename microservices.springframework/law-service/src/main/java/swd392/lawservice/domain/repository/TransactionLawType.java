package swd392.lawservice.domain.repository;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import swd392.lawservice.domain.entity.LawType;

@Service
@Transactional
@RequiredArgsConstructor
public class TransactionLawType implements ITransactionLawType {

    private final LawTypeRepository lawTypeRepository;

    @Override
    public LawType save(LawType lawType) {
        return this.lawTypeRepository.save(lawType);
    }
}
