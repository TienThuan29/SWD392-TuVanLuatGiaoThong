package swd392.lawservice.infrastructure.transaction;

import swd392.lawservice.domain.entity.LawType;

public interface ILawTypeTransaction {

    LawType save(LawType lawType);

}
