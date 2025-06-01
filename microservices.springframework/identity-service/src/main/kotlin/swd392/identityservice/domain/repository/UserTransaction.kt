package swd392.identityservice.domain.repository

import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional
import swd392.identityservice.domain.entity.User

@Service
@Transactional
class UserTransaction(
    private val userRepository: UserRepository
) : IUserTransaction{

    override fun updateUser(user: User): Boolean {
        try {
            userRepository.save(user)
        }
        catch (ex: Exception) {
            throw Exception("Cập nhật người dùng thất bại, Id: ${user.id}, Lỗi: ${ex.message}")
        }
        return true;
    }

}