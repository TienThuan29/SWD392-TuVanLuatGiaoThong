package swd392.identityservice.infrastructure.configuration

import swd392.identityservice.domain.repository.UserRepository
import swd392.identityservice.infrastructure.usecase.JwtUsecase
import jakarta.servlet.http.HttpServletRequest
import jakarta.servlet.http.HttpServletResponse
import org.springframework.beans.factory.annotation.Value
import org.springframework.context.annotation.PropertySource
import org.springframework.security.oauth2.core.user.OAuth2User
import org.springframework.security.core.Authentication
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler
import org.springframework.stereotype.Component
import swd392.identityservice.domain.entity.User
import swd392.identityservice.domain.fixed.Role
import java.io.IOException
import java.util.UUID

@Component
@PropertySource("classpath:security.properties")
class OAuth2LoginSuccessHandler(
    private val jwtUsecase: JwtUsecase,
    private val userRepository: UserRepository,
    @Value("\${frontend.oauth2.redirect-url}") val oauth2RedirectUrl: String
) : SimpleUrlAuthenticationSuccessHandler() {

    @Throws(IOException::class)
    override fun onAuthenticationSuccess(
        request: HttpServletRequest?, response: HttpServletResponse?, authentication: Authentication
    ) {
        val oAuth2User = authentication.getPrincipal() as OAuth2User
        val email = oAuth2User.getAttribute<String>("email")
        // If user exists or register new user
        val user: User = userRepository.findByEmail(email!!)
            .orElseGet { registerNewUser(oAuth2User) }
        val accessToken: String = jwtUsecase.generateToken(user)
        val refreshToken: String = jwtUsecase.generateRefreshToken(user)
        redirectStrategy.sendRedirect(request, response, "$oauth2RedirectUrl?accessToken=$accessToken&refreshToken=$refreshToken")
    }

    private fun registerNewUser(oAuth2User: OAuth2User): User {
        val newUser = User(
            email = oAuth2User.getAttribute<String>("email"),
            usernameAuth = UUID.randomUUID().toString(),
            fullname = oAuth2User.getAttribute("name"),
            isEnable = true,
            role = Role.USER
        );
        return userRepository.save(newUser);
    }

}
