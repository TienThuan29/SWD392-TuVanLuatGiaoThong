package swd392.identityservice.infrastructure.usecase

import swd392.identityservice.application.dto.ApiResponse
import swd392.identityservice.application.dto.AuthenticationResponse
import swd392.identityservice.application.mapper.UserMapper
import swd392.identityservice.application.usecase.IAuthenticationUsecase
import swd392.identityservice.domain.entity.User
import swd392.identityservice.domain.repository.TokenTransaction
import swd392.identityservice.domain.repository.UserRepository
import swd392.identityservice.web.dto.AuthenticationUserRequest
import swd392.identityservice.web.dto.RegisterUserRequest
import jakarta.servlet.http.HttpServletRequest
import jakarta.servlet.http.HttpServletResponse
import lombok.RequiredArgsConstructor
import org.springframework.security.authentication.AuthenticationManager
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken
import org.springframework.security.core.AuthenticationException
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.stereotype.Service


@Service
@RequiredArgsConstructor
class AuthenticationUsecase(
    private val userRepository: UserRepository,
    private val jwtUsecase: JwtUsecase,
    private val passwordEncoder: PasswordEncoder,
    private val userMapper: UserMapper,
    private val authenticationManager: AuthenticationManager,
    private val tokenTransaction: TokenTransaction
) : IAuthenticationUsecase {

    val AUTHENTICATION_HEADER: String = "Authorization"
    val AUTHENTICATION_HEADER_BEARER: String = "Bearer "

    override fun registerUser(registerUserRequest: RegisterUserRequest): ApiResponse<Any> {
        if (this.isExistUsername(registerUserRequest.username)) {
            throw RuntimeException("User does exist! Please choose another username.");
        }
        val user: User = userMapper.toEntity(registerUserRequest);
        user.passwordAuth = passwordEncoder.encode(registerUserRequest.password);
        user.isEnable = true;
        userRepository.save(user);
        return ApiResponse(
            status = "success", message = "User registered successfully!",
            dataResponse = AuthenticationResponse(
                accessToken = jwtUsecase.generateToken(user),
                refreshToken = jwtUsecase.generateRefreshToken(user)
            )
        );
    }

    override fun authenticateUser(authUserRequest: AuthenticationUserRequest): ApiResponse<Any> {
        try {
            authenticationManager.authenticate(
                UsernamePasswordAuthenticationToken(authUserRequest.username, authUserRequest.password)
            )
        }
        catch (e: AuthenticationException) {
            throw RuntimeException("Username or password is incorrect!")
        }
        val user: User = this.getUser(authUserRequest.username);
        val jwtToken: String = jwtUsecase.generateToken(user)
        val refreshToken: String = jwtUsecase.generateRefreshToken(user)
        tokenTransaction.apply {
            revokeAllOldUserToken(user)
            saveToken(user, jwtToken)
        }
        return ApiResponse(
            status = "success", message = "Sign in successfully!",
            dataResponse = AuthenticationResponse(accessToken = jwtToken, refreshToken = refreshToken)
        )
    }

    override fun refreshToken(request: HttpServletRequest, response: HttpServletResponse): ApiResponse<Any> {
        val authHeader = request.getHeader(this.AUTHENTICATION_HEADER)
        if (!authHeader.startsWith(this.AUTHENTICATION_HEADER_BEARER)) {
            return unauthorizedResponse()
        }
        val refreshToken = authHeader.removePrefix(this.AUTHENTICATION_HEADER_BEARER)
        val user = getUser(jwtUsecase.extractUsername(refreshToken))
        if (!jwtUsecase.isValidToken(refreshToken, user)) {
            return unauthorizedResponse()
        }
        val newAccessToken = jwtUsecase.generateToken(user)
        tokenTransaction.apply {
            revokeAllOldUserToken(user)
            saveToken(user, newAccessToken)
        }
        return ApiResponse(
            status = "success", message = "Refresh token successfully!",
            dataResponse = AuthenticationResponse(newAccessToken, refreshToken)
        )
    }

    private fun unauthorizedResponse() = ApiResponse<Any>(
        status = "unauthorized", message = "Login session is expired!",
        dataResponse = AuthenticationResponse("", "")
    )

    override fun getUserInfo(request: HttpServletRequest, response: HttpServletResponse): ApiResponse<Any> {
        val authHeader: String = request.getHeader(this.AUTHENTICATION_HEADER);
        if (!authHeader.startsWith(this.AUTHENTICATION_HEADER_BEARER)) {
            return ApiResponse(
                status = "unauthorized", message = "Token is invalid!",
                dataResponse = null
            )
        }
        val jwt = authHeader.substring(AUTHENTICATION_HEADER_BEARER.length)
        return ApiResponse(
            status = "success", message = "Get user info successfully!",
            dataResponse = userMapper.toResponse(
                this.getUser(jwtUsecase.extractUsername(jwt))
            )
        )
    }

    /**
     * Check token of a user is valid or not
     * @param token user's access token
     * @return ApiResponse { status, message, roles }
     */
    override fun authenticateToken(token: String): ApiResponse<Any> {
        val user: User = this.getUser(jwtUsecase.extractUsername(token));
        val roles: MutableList<String> = jwtUsecase.extractRoles(token) as MutableList<String>;
        if (!jwtUsecase.isValidToken(token, user)) {
            return ApiResponse(status = "invalid", message = "Token is valid!", dataResponse = null)
        }
        return ApiResponse(status = "valid", message = "Token is valid!", dataResponse = roles)
    }

    override fun generateToken(email: String): AuthenticationResponse {
        val user: User = userRepository.findByEmail(email).orElseThrow();
        val jwtToken: String = jwtUsecase.generateToken(user)
        val refreshToken: String = jwtUsecase.generateRefreshToken(user)
        return AuthenticationResponse(accessToken = jwtToken, refreshToken = refreshToken)
    }

    private fun isExistUsername(username: String): Boolean {
        return userRepository.findByUsernameAuth(username).isPresent
    }

    private fun getUser(username: String): User {
        return userRepository.findByUsernameAuth(username).orElseThrow()
    }
}