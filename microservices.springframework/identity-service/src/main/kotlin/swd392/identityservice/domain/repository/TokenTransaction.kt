package swd392.identityservice.domain.repository

import swd392.identityservice.domain.entity.Token
import swd392.identityservice.domain.entity.User
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional

@Service
@Transactional
class TokenTransaction(
    private val tokenRepository: TokenRepository
) {

    fun saveToken(user: User, jwtToken: String) {
        tokenRepository.save(Token(
            token = jwtToken,
            expired = false,
            revoked = false,
            user = user
        ));
    }

    @Transactional
    fun revokeAllOldUserToken(user: User) {
        val tokens: List<Token> = tokenRepository.findAllValidTokenByUsername(user.id);
        tokenRepository.deleteAll(tokens);
    }

}