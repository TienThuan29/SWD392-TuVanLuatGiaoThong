package swd392.identityservice.infrastructure.usecase

import org.springframework.stereotype.Service
import swd392.identityservice.application.dto.ApiResponse
import swd392.identityservice.application.exception.UserNotFoundException
import swd392.identityservice.application.mapper.UserMapper
import swd392.identityservice.application.usecase.IUserManagementUsecase
import swd392.identityservice.domain.entity.User
import swd392.identityservice.infrastructure.transaction.IUserTransaction
import swd392.identityservice.domain.repository.UserRepository
import java.util.*

@Service
class UserManagementUsecase(
    private val userTransaction: IUserTransaction,
    private val userRepository: UserRepository,
    private val userMapper: UserMapper
) : IUserManagementUsecase{

    override fun getAllUsers(): ApiResponse<Any> {
        return ApiResponse(
            status = "success",
            message = "Lấy danh sách người dùng thành công",
            dataResponse = userRepository.findAll().map { user -> userMapper.toResponse(user) }
        )
    }

    override fun disableUser(id: String): ApiResponse<Any> {
        val user: User = userRepository.findById(UUID.fromString(id))
            .orElseThrow { UserNotFoundException("Không tìm thấy người dùng mang Id: $id") }
        user.isEnable = false
        return userTransaction.updateUser(user).let {
            ApiResponse(
                status = "success",
                message = "Người dùng đã bị khóa hóa thành công",
                dataResponse = null
            )
        }
    }

}