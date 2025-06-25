package swd392.lawservice.domain.repository;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import swd392.lawservice.domain.entity.LawType;

@Service
@Transactional
public class TransactionLawType implements ITransactionLawType {

    private LawTypeRepository lawTypeRepository;

    @Override
    public LawType save(LawType lawType) {
        return this.lawTypeRepository.save(lawType);
    }
}
