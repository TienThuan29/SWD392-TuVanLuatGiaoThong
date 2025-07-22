package swd392.identityservice.web.dto

import com.fasterxml.jackson.annotation.JsonCreator
import com.fasterxml.jackson.annotation.JsonProperty
import jakarta.validation.constraints.NotBlank
import jakarta.validation.constraints.Size

class RegisterRequest(

    @NotBlank(message = "Username must not be blank")
    @Size(min = 3, max = 60, message = "Username must be between 3 and 6 characters")
    val username: String,

    @NotBlank(message = "Email must not be blank")
    @Size(min = 5, max = 320, message = "Email must be between 5 and 320 characters")
    val email: String,

    @NotBlank(message = "Password must not be blank")
    @Size(min = 5, max = 256, message = "Password must be between 5 and 256")
    val password: String,

    @NotBlank(message = "Fullname must not be blank")
    @Size(min = 1, max = 100, message = "Fullname must be between 1 and 100 characters")
    val fullname: String,

    val role: String
)

class RegisterUserRequest @JsonCreator constructor(

    @NotBlank(message = "Username must not be blank")
    @Size(min = 3, max = 60, message = "Username must be between 3 and 6 characters")
    @JsonProperty("username")
    val username: String,

    @NotBlank(message = "Email must not be blank")
    @Size(min = 5, max = 320, message = "Email must be between 5 and 320 characters")
    @JsonProperty("email")
    val email: String,

    @NotBlank(message = "Password must not be blank")
    @Size(min = 5, max = 256, message = "Password must be between 5 and 256")
    @JsonProperty("password")
    val password: String,

    @NotBlank(message = "Fullname must not be blank")
    @Size(min = 1, max = 100, message = "Fullname must be between 1 and 100 characters")
    @JsonProperty("fullname")
    val fullname: String
)

class VerifyOptRequest(
    @NotBlank(message = "Email must not be blank")
    val email: String,

    @NotBlank(message = "OTP must not be blank")
    val sixDigitsOtp: String
)