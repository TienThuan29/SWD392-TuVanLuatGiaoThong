package swd392.identityservice.web.dto

import com.fasterxml.jackson.annotation.JsonCreator
import com.fasterxml.jackson.annotation.JsonProperty
import lombok.AllArgsConstructor
import lombok.Data
import lombok.NoArgsConstructor
import java.io.Serializable

class RegisterRequest(
    val username: String,
    val email: String,
    val password: String,
    val fullname: String,
    val role: String
)

class RegisterUserRequest @JsonCreator constructor(
    @JsonProperty("username") val username: String,
    @JsonProperty("email") val email: String,
    @JsonProperty("password") val password: String,
    @JsonProperty("fullname") val fullname: String
)

class VerifyOptRequest(
    val email: String,
    val sixDigitsOtp: String
)