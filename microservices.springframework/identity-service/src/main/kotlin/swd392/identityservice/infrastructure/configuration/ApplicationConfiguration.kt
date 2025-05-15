package swd392.identityservice.infrastructure.configuration

import swd392.identityservice.domain.repository.UserRepository
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.security.authentication.AuthenticationManager
import org.springframework.security.authentication.AuthenticationProvider
import org.springframework.security.authentication.dao.DaoAuthenticationProvider
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration
import org.springframework.security.core.userdetails.UserDetailsService
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder
import org.springframework.security.crypto.password.PasswordEncoder

@Configuration
class ApplicationConfiguration(
    private val userRepository: UserRepository
) {
    @Bean
    fun userDetailsService(): UserDetailsService {
        return UserDetailsService { username: String? -> username?.let {
                userRepository.findByUsernameAuth(it).orElseThrow()
            }
        }
    }

    @Bean
    fun passwordEncoder(): PasswordEncoder {
        return BCryptPasswordEncoder()
    }

    @Bean
    @Throws(Exception::class)
    fun authenticationManager(config: AuthenticationConfiguration): AuthenticationManager {
        return config.authenticationManager
    }

    @Bean
    fun authenticationProvider(): AuthenticationProvider {
        val daoAuthProvider = DaoAuthenticationProvider()
        daoAuthProvider.setUserDetailsService(userDetailsService())
        daoAuthProvider.setPasswordEncoder(passwordEncoder())
        return daoAuthProvider
    }

}