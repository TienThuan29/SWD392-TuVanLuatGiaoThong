package swd392.identityservice.web.dto

class RegisterUserRequest(
    val username: String,
    val email: String,
    val password: String,
    val fullname: String,
    val role: String
)