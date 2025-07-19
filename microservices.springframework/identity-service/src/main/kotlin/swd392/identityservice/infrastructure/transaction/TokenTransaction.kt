package swd392.identityservice.infrastructure.transaction

import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional
import swd392.identityservice.domain.entity.Token
import swd392.identityservice.domain.entity.User
import swd392.identityservice.domain.repository.TokenRepository

@Service
@Transactional
class TokenTransaction(
    private val tokenRepository: TokenRepository
) : ITokenTransaction{

    override fun saveToken(user: User, jwtToken: String) {
        tokenRepository.save(
            Token(
                token = jwtToken,
                expired = false,
                revoked = false,
                user = user
            )
        );
    }

    @Transactional
    override fun revokeAllOldUserToken(user: User) {
        val tokens: List<Token> = tokenRepository.findAllValidTokenByUsername(user.id);
        tokenRepository.deleteAll(tokens);
    }

}