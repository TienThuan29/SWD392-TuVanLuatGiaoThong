package swd392.identityservice.domain.repository

import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query
import java.util.*
import swd392.identityservice.domain.entity.Token

interface TokenRepository : JpaRepository<Token, Long> {
    @Query(
        "SELECT t from Token t " +
                "INNER JOIN User u " +
                "ON t.user.id = u.id " +
                "WHERE u.id =:userId AND (t.expired = false OR t.revoked = false)"
    )
    fun findAllValidTokenByUsername(userId: UUID?): List<Token>
}