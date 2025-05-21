package swd392.identityservice.application.usecase

import swd392.identityservice.application.dto.ApiResponse
import swd392.identityservice.application.dto.AuthenticationResponse
import swd392.identityservice.web.dto.AuthenticationUserRequest
import swd392.identityservice.web.dto.RegisterUserRequest
import jakarta.servlet.http.HttpServletRequest
import jakarta.servlet.http.HttpServletResponse

interface IAuthenticationUsecase {

    fun registerUser(registerUserRequest: RegisterUserRequest): ApiResponse<Any>

    fun authenticateUser(authUserRequest: AuthenticationUserRequest): ApiResponse<Any>

    fun refreshToken(request: HttpServletRequest, response: HttpServletResponse): ApiResponse<Any>

    fun getUserInfo(request: HttpServletRequest, response: HttpServletResponse): ApiResponse<Any>

    fun authenticateToken(token: String): ApiResponse<Any>

    fun generateToken(email: String): AuthenticationResponse

}