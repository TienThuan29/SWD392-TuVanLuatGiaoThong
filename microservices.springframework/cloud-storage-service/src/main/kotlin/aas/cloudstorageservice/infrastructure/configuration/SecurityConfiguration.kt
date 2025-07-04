package aas.cloudstorageservice.infrastructure.configuration

import lombok.RequiredArgsConstructor
import org.springframework.beans.factory.annotation.Value
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.context.annotation.PropertySource
import org.springframework.security.config.annotation.web.builders.HttpSecurity
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity
import org.springframework.security.web.SecurityFilterChain
import org.springframework.web.cors.CorsConfiguration
import org.springframework.web.cors.CorsConfigurationSource
import org.springframework.web.cors.UrlBasedCorsConfigurationSource

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
@PropertySource("classpath:security.properties")
class SecurityConfiguration {

    @Value("#{'\${app.allowed-origins}'.split(',')}")
    private val ALLOWED_ORIGINS: MutableList<String?>? = null
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
            .authorizeHttpRequests { it
                .requestMatchers(*OPEN_API).permitAll()
                // .anyRequest().authenticated()
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