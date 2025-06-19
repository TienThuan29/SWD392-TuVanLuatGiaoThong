package swd392.identityservice.infrastructure.usecase

import swd392.identityservice.application.dto.ApiResponse
import swd392.identityservice.application.dto.AuthenticationResponse
import swd392.identityservice.application.mapper.UserMapper
import swd392.identityservice.application.usecase.IAuthenticationUsecase
import swd392.identityservice.domain.entity.User
import swd392.identityservice.domain.repository.TokenTransaction
import swd392.identityservice.domain.repository.UserRepository
import swd392.identityservice.web.dto.AuthenticationUserRequest
import swd392.identityservice.web.dto.RegisterRequest
import jakarta.servlet.http.HttpServletRequest
import jakarta.servlet.http.HttpServletResponse
import lombok.RequiredArgsConstructor
import org.slf4j.LoggerFactory
import org.springframework.security.authentication.AuthenticationManager
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken
import org.springframework.security.core.AuthenticationException
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.stereotype.Service
import swd392.identityservice.infrastructure.utils.OtpGeneratorUtil
import swd392.identityservice.web.dto.RegisterUserRequest
import java.time.Duration
import java.util.concurrent.CompletableFuture


@Service
@RequiredArgsConstructor
class AuthenticationUsecase(
    private val userRepository: UserRepository,
    private val jwtUsecase: JwtUsecase,
    private val passwordEncoder: PasswordEncoder,
    private val userMapper: UserMapper,
    private val authenticationManager: AuthenticationManager,
    private val tokenTransaction: TokenTransaction,
    private val optGeneratorUtil: OtpGeneratorUtil,
    private val emailUsecase: EmailUsecase,
    private val redisUsecase: RedisUsecase
) : IAuthenticationUsecase {

    private val logger = LoggerFactory.getLogger(AuthenticationUsecase::class.java)

    val AUTHENTICATION_HEADER: String = "Authorization"
    val AUTHENTICATION_HEADER_BEARER: String = "Bearer "
    val OTP_DURANTION_MIN: Long = 5;


    override fun registerUserWithVerifyingEmail(registerUserRequest: RegisterUserRequest): ApiResponse<Any> {
        val emailHasUser: Boolean = userRepository.findByEmail(registerUserRequest.email).isPresent;
        if (emailHasUser) { // If exist user
            return ApiResponse(
                status = "fail", "Email đã được đăng ký!", dataResponse = null
            )
        }
        else {
            val sixDigitsOtp: String = optGeneratorUtil.generateOtp();
            // Send email asynchronously using CompletableFuture
            CompletableFuture.runAsync {
                try {
                    emailUsecase.sendOtpEmail(registerUserRequest.email, sixDigitsOtp)
//                    logger.info("OTP email sent successfully to: ${registerUserRequest.email}")
                } catch (e: Exception) {
                    logger.error("Failed to send OTP email to: ${registerUserRequest.email}", e)
                }
            }
            // Save to Redis
            val cacheData = mapOf(
                "registerData" to registerUserRequest,
                "otp" to sixDigitsOtp,
                "createdAt" to System.currentTimeMillis()
            )
            redisUsecase.setValue(
                "registration:${registerUserRequest.email}",
                cacheData,
                Duration.ofMinutes(this.OTP_DURANTION_MIN)
            )
            return ApiResponse(
                status = "success",
                message = "OTP đã được gửi đến email của bạn. Vui lòng kiểm tra và xác thực trong vòng 5 phút.",
                dataResponse = mapOf("email" to registerUserRequest.email)
            )
        }
    }

    override fun verifyOtp(email: String, sixDigitsOtp: String): ApiResponse<Any> {
        // Get cached registration data from Redis
        val cacheKey = "registration:$email"
        val cachedData = redisUsecase.getValueByKey(cacheKey) as? Map<*, *>
        if (cachedData == null) {
            return ApiResponse(
                status = "fail",
                message = "OTP đã hết hạn hoặc không tồn tại. Vui lòng đăng ký lại.",
                dataResponse = null
            )
        }
        // Extract stored OTP and registration data
        val storedOtp = cachedData["otp"] as? String
        val registerUserRequest = cachedData["registerData"] as? RegisterUserRequest
        val createdAt = cachedData["createdAt"] as? Long
        // Validate required data
        if (storedOtp == null || registerUserRequest == null) {
            redisUsecase.deleteKey(cacheKey)
            return ApiResponse(
                status = "fail",
                message = "Dữ liệu OTP không hợp lệ. Vui lòng đăng ký lại.",
                dataResponse = null
            )
        }
        // Check if OTP has expired (additional check - Redis TTL is primary)
        val currentTime = System.currentTimeMillis()
        val otpAge = createdAt?.let { (currentTime - it) / 1000 / 60 }
        if (otpAge != null && otpAge > this.OTP_DURANTION_MIN) {
            redisUsecase.deleteKey(cacheKey)
            return ApiResponse(
                status = "fail",
                message = "OTP đã hết hạn. Vui lòng đăng ký lại.",
                dataResponse = null
            )
        }

        // OTP is valid - proceed with user registration
        val user: User = userMapper.toEntity(registerUserRequest);
        user.passwordAuth = passwordEncoder.encode(registerUserRequest.password);
        user.isEnable = true;
        userRepository.save(user);
        return ApiResponse(
            status = "success", message = "Đăng ký thành công!",
            dataResponse = AuthenticationResponse(
                accessToken = jwtUsecase.generateToken(user),
                refreshToken = jwtUsecase.generateRefreshToken(user)
            )
        );
    }

    override fun registerUser(registerRequest: RegisterRequest): ApiResponse<Any> {
        if (this.isExistUsername(registerRequest.username)) {
            throw RuntimeException("User does exist! Please choose another username.");
        }
        val user: User = userMapper.toEntity(registerRequest);
        user.passwordAuth = passwordEncoder.encode(registerRequest.password);
        user.isEnable = true;
        userRepository.save(user);
        return ApiResponse(
            status = "success", message = "Đăng ký thành công!",
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