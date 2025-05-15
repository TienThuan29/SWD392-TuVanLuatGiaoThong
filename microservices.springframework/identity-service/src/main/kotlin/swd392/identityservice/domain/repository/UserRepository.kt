package swd392.identityservice.domain.repository

import swd392.identityservice.domain.entity.User
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository
import java.util.*

@Repository
interface UserRepository : JpaRepository<User, UUID> {
    fun findByUsernameAuth(usernameAuth: String): Optional<User>

    fun findByEmail(email: String): Optional<User>
}