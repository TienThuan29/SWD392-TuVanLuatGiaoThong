package swd392.identityservice.web.dto

import jakarta.validation.constraints.NotBlank
import jakarta.validation.constraints.Size

class AuthenticationUserRequest(

    @NotBlank(message = "Username must not be blank")
    @Size(min = 3, max = 60, message = "Username must be between 1 and 60")
    val username: String,

    @NotBlank(message = "Password must not be blank")
    @Size(min = 1, max = 256, message = "Password must be between 1 and 256")
    val password: String
)