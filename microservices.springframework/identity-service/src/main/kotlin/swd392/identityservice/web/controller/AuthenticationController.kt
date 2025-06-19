package swd392.identityservice.web.controller

import swd392.identityservice.application.dto.ApiResponse
import swd392.identityservice.application.usecase.IAuthenticationUsecase
import swd392.identityservice.web.dto.AuthenticationUserRequest
import swd392.identityservice.web.dto.RegisterRequest
import jakarta.servlet.http.HttpServletRequest
import jakarta.servlet.http.HttpServletResponse
import org.springframework.data.redis.core.RedisTemplate
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import swd392.identityservice.web.dto.RegisterUserRequest
import swd392.identityservice.web.dto.VerifyOptRequest
import java.util.concurrent.TimeUnit


@RestController
@RequestMapping("/api/v1/identity")
class AuthenticationController(
    private val authenticationUsecase: IAuthenticationUsecase,
    val redisTemplate: RedisTemplate<String, Any>
) {

    @GetMapping("/health")
    fun healthCheck() : String {
        return "Identity service is up and running!"
    }

    @PostMapping("/register-with-verifying")
    fun registerUserWithVerifyingEmail(@RequestBody registerUserRequest: RegisterUserRequest) : ResponseEntity<ApiResponse<Any>> {
        return ResponseEntity(authenticationUsecase.registerUserWithVerifyingEmail(registerUserRequest), HttpStatus.OK)
    }

    @PostMapping("/verify-otp")
    fun verifyOtp(@RequestBody verifyOptRequest: VerifyOptRequest) : ResponseEntity<ApiResponse<Any>> {
        return ResponseEntity(
            authenticationUsecase.verifyOtp(verifyOptRequest.email, verifyOptRequest.sixDigitsOtp),
            HttpStatus.OK
        )
    }

    @PostMapping("/register")
    fun registerUser(@RequestBody registerRequest: RegisterRequest) : ResponseEntity<ApiResponse<Any>> {
        return ResponseEntity(authenticationUsecase.registerUser(registerRequest), HttpStatus.CREATED)
    }

    @PostMapping("/authenticate")
    fun authenticateUser(@RequestBody authUserRequest: AuthenticationUserRequest) : ResponseEntity<ApiResponse<Any>> {
        return ResponseEntity(authenticationUsecase.authenticateUser(authUserRequest), HttpStatus.OK)
    }

    @PostMapping("/refresh")
    fun refreshToken(request: HttpServletRequest, response: HttpServletResponse) : ResponseEntity<ApiResponse<Any>> {
        return ResponseEntity(authenticationUsecase.refreshToken(request, response), HttpStatus.OK)
    }

    @GetMapping("/user")
    fun getUserInfo(request: HttpServletRequest, response: HttpServletResponse) : ResponseEntity<ApiResponse<Any>> {
        return ResponseEntity(authenticationUsecase.getUserInfo(request, response), HttpStatus.OK)
    }

    @PostMapping("/authenticate/token/{token}")
    fun authenticateToken(@PathVariable("token") token: String): ResponseEntity<ApiResponse<Any>> {
        return ResponseEntity(authenticationUsecase.authenticateToken(token = token), HttpStatus.OK);
    }

    @GetMapping("/test-redis")
    fun health(): ResponseEntity<Map<String, String>> {

        val status = try {
            redisTemplate.opsForValue().set("test:ping", "pong", 10, TimeUnit.SECONDS)
            val result = redisTemplate.opsForValue().get("test:ping")
            "Redis connection successful: $result"
        } catch (e: Exception) {
            "Redis connection failed: ${e.message}"
        }
        return ResponseEntity.ok(mapOf("status" to status))
    }
}