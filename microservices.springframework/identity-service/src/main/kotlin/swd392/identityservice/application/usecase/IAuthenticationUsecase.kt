package swd392.identityservice.application.usecase

import swd392.identityservice.application.dto.ApiResponse
import swd392.identityservice.application.dto.AuthenticationResponse
import swd392.identityservice.web.dto.AuthenticationUserRequest
import swd392.identityservice.web.dto.RegisterRequest
import jakarta.servlet.http.HttpServletRequest
import jakarta.servlet.http.HttpServletResponse
import swd392.identityservice.web.dto.RegisterUserRequest

interface IAuthenticationUsecase {

    fun registerUserWithVerifyingEmail(registerUserRequest: RegisterUserRequest) : ApiResponse<Any>

    fun verifyOtp(email: String, sixDigitsOtp: String) : ApiResponse<Any>

    fun registerUser(registerRequest: RegisterRequest): ApiResponse<Any>

    fun authenticateUser(authUserRequest: AuthenticationUserRequest): ApiResponse<Any>

    fun refreshToken(request: HttpServletRequest, response: HttpServletResponse): ApiResponse<Any>

    fun getUserInfo(request: HttpServletRequest, response: HttpServletResponse): ApiResponse<Any>

    fun authenticateToken(token: String): ApiResponse<Any>

    fun generateToken(email: String): AuthenticationResponse

}