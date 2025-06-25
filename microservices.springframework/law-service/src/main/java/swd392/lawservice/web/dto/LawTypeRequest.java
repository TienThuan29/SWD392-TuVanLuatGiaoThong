package swd392.lawservice.web.dto;

import lombok.Data;
import java.time.Instant;
import java.util.UUID;

@Data
public class LawTypeRequest {

    private UUID id;

    private String name;

}
