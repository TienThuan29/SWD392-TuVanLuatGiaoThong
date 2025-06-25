package swd392.lawservice.domain.repository;

import swd392.lawservice.domain.entity.LawType;
import java.util.UUID;

public interface ITransactionLawType {

    LawType save(LawType lawType);

}
