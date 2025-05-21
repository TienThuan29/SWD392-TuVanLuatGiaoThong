package swd392.identityservice.web.controller

import swd392.identityservice.application.dto.ApiResponse
import swd392.identityservice.application.usecase.IAuthenticationUsecase
import swd392.identityservice.web.dto.AuthenticationUserRequest
import swd392.identityservice.web.dto.RegisterUserRequest
import jakarta.servlet.http.HttpServletRequest
import jakarta.servlet.http.HttpServletResponse
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*


@RestController
@RequestMapping("/api/v1/identity")
class AuthenticationController(
    private val authenticationUsecase: IAuthenticationUsecase
) {

    @GetMapping("/health")
    fun healthCheck() : String {
        return "Identity service is up and running!"
    }

    @PostMapping("/register")
    fun registerUser(@RequestBody registerUserRequest: RegisterUserRequest) : ResponseEntity<ApiResponse<Any>> {
        return ResponseEntity(authenticationUsecase.registerUser(registerUserRequest), HttpStatus.CREATED)
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

}