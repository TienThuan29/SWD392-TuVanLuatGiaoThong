package swd392.identityservice.application.exception

import lombok.Builder
import lombok.Data
import java.time.LocalDateTime

@Data
@Builder
class ValidationErrorResponse (
    val status: Int = 0,
    val message: String? = null,
    val errors: MutableMap<String?, String?>? = null,
    val timestamp: LocalDateTime? = null
)