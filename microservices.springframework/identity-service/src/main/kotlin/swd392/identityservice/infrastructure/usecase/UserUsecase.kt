package swd392.identityservice.infrastructure.usecase

import lombok.RequiredArgsConstructor
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.stereotype.Service
import swd392.identityservice.application.dto.ApiResponse
import swd392.identityservice.application.exception.InternalServerException
import swd392.identityservice.application.exception.ResourceNotFoundException
import swd392.identityservice.application.mapper.UserMapper
import swd392.identityservice.application.usecase.IUserUsecase
import swd392.identityservice.domain.entity.User
import swd392.identityservice.domain.repository.UserRepository
import swd392.identityservice.infrastructure.utils.HashingUtil
import swd392.identityservice.web.dto.PasswordChangeRequest
import swd392.identityservice.web.dto.UpdatingUsernameAndPasswordRequest
import swd392.identityservice.web.dto.UserInfoRequest
import java.time.Instant
import java.util.UUID

@Service
@RequiredArgsConstructor
class UserUsecase(
    private val userRepository: UserRepository,
    private val userMapper: UserMapper,
    private val hashingUtil: HashingUtil,
    private val passwordEncoder: PasswordEncoder
) : IUserUsecase {

    override fun updateInfo(userId: String, userInfoRequest: UserInfoRequest): ApiResponse<Any> {
            val decodedUserId: String = this.hashingUtil.decode(userId)
            val user: User = this.userRepository.findById(
                UUID.fromString(decodedUserId)
            ).orElseThrow { ResourceNotFoundException("Cannot find user by id: $decodedUserId") }

            try {
                user.fullname = userInfoRequest.fullname
                user.avatarUrl = userInfoRequest.avatarUrl
                user.birthDay = userInfoRequest.birthDay
                user.updatedDate = Instant.now()
                val updatedUser: User = this.userRepository.save(user)
                return ApiResponse(
                    dataResponse = this.userMapper.toResponse(updatedUser),
                    message = "Update user info successfully",
                    status = "success"
                )
            }
            catch (e: Exception) {
                throw InternalServerException("An error occurred while updating user info: ${e.message}");
            }
    }

    override fun updateUsernameAndPassword(
        userId: String, request: UpdatingUsernameAndPasswordRequest
    ): ApiResponse<Any> {
        val decodedUserId: String = this.hashingUtil.decode(userId)
        val user: User = this.userRepository.findById(
            UUID.fromString(decodedUserId)
        ).orElseThrow { ResourceNotFoundException("Cannot find user by id: $decodedUserId") }

        val isExistUser = this.userRepository.existsByUsernameAuth(request.newUsername);
        if (isExistUser) {
            return ApiResponse(
                dataResponse = null,
                message = "Tên đăng nhập đã tồn tại, vui lòng chọn tên khác",
                status = "fail"
            )
        }

        try {
            if (user.passwordAuth == null) {
                user.usernameAuth = request.newUsername
                user.passwordAuth = this.passwordEncoder.encode(request.newPassword)
                user.updatedDate = Instant.now()
                val updatedUser: User = this.userRepository.save(user)
                return ApiResponse(
                    dataResponse = this.userMapper.toResponse(updatedUser),
                    message = "",
                    status = "success"
                )
            }
            else {
                return ApiResponse(
                    dataResponse = null,
                    message = "Update username and password unsuccessfully, user already has username and password",
                    status = "fail"
                )
            }
        }
        catch (e: Exception) {
            throw InternalServerException("An error occurred while updating username and password: ${e.message}")
        }
    }

    override fun changePassword(userId: String, changePasswordRequest: PasswordChangeRequest): ApiResponse<Any> {
        val decodedUserId: String = this.hashingUtil.decode(userId)
        val user: User = this.userRepository.findById(
            UUID.fromString(decodedUserId)
        ).orElseThrow { ResourceNotFoundException("Cannot find user by id: $decodedUserId") }
        try {
            if (user.passwordAuth == null) {
                return ApiResponse(
                    dataResponse = null,
                    message = "Đổi mật khẩu không thành công, người dùng chưa có mật khẩu",
                    status = "fail"
                )
            }
            else {
                if (!this.passwordEncoder.matches(changePasswordRequest.oldPassword, user.passwordAuth)) {
                    return ApiResponse(
                        dataResponse = null,
                        message = "Đổi mật khẩu không thành công!",
                        status = "fail"
                    )
                }
                else {
                    user.passwordAuth = this.passwordEncoder.encode(changePasswordRequest.newPassword)
                    val updatedUser: User = this.userRepository.save(user)
                    return ApiResponse(
                        dataResponse = this.userMapper.toResponse(updatedUser),
                        message = "Đổi mật khẩu thành công",
                        status = "success"
                    )
                }
            }
        }
        catch (e: Exception) {
            throw InternalServerException("An error occurred while changing password: ${e.message}")
        }
    }

}