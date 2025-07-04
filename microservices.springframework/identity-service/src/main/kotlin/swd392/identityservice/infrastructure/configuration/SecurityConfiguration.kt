package swd392.identityservice.infrastructure.configuration

import lombok.RequiredArgsConstructor
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.security.authentication.AuthenticationProvider
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity
import org.springframework.security.config.annotation.web.builders.HttpSecurity
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity
import org.springframework.security.config.http.SessionCreationPolicy
import org.springframework.security.web.SecurityFilterChain
import org.springframework.web.cors.CorsConfiguration
import org.springframework.web.cors.CorsConfigurationSource
import org.springframework.web.cors.UrlBasedCorsConfigurationSource

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
@RequiredArgsConstructor
class SecurityConfiguration(
    private val authenticationProvider: AuthenticationProvider,
    private val oAuth2LoginSuccessHandler: OAuth2LoginSuccessHandler
) {

    private val ALLOWED_ORIGINS = listOf("http://localhost:3000", "http://192.168.2.73:3000");
    private val ALLOWED_METHODS = listOf("GET", "POST", "PUT", "DELETE");
    private val ALLOWED_HEADERS = listOf("*");
    private val CORS_MAX_AGE: Long = 3600;
    private val CORS_PATTERN = "/**";
    private val OPEN_API = arrayOf("/**");

    @Bean
    fun securityFilterChain(http: HttpSecurity): SecurityFilterChain {
        http
                .csrf { it.disable() }
                .cors { it.configurationSource(corsConfigurationSource()) }
                .authorizeHttpRequests {
                    it.requestMatchers(*OPEN_API).permitAll()
                    it.anyRequest().authenticated()
                }
                .oauth2Login {
                    it.successHandler(oAuth2LoginSuccessHandler)
                }
                .authenticationProvider(authenticationProvider)
                .sessionManagement {
                    it.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                }
        return http.build();
    }

    @Bean
    fun corsConfigurationSource(): CorsConfigurationSource {
        val corsConfiguration = CorsConfiguration();
        corsConfiguration.allowedOrigins = ALLOWED_ORIGINS;
        corsConfiguration.allowedMethods = ALLOWED_METHODS;
        corsConfiguration.allowCredentials = true;
        corsConfiguration.allowedHeaders = ALLOWED_HEADERS;
        corsConfiguration.maxAge = CORS_MAX_AGE;
        val source = UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration(CORS_PATTERN, corsConfiguration);
        return source;
    }


}
