package swd392.identityservice.infrastructure.usecase

import io.jsonwebtoken.Claims
import io.jsonwebtoken.Jwts
import io.jsonwebtoken.SignatureAlgorithm
import io.jsonwebtoken.io.Decoders
import io.jsonwebtoken.security.Keys
import lombok.RequiredArgsConstructor
import org.springframework.beans.factory.annotation.Value
import org.springframework.context.annotation.PropertySource
import org.springframework.security.core.userdetails.UserDetails
import org.springframework.stereotype.Service
import java.security.Key
import java.util.*
import java.util.function.Function

@Service
@RequiredArgsConstructor
@PropertySource("classpath:security.properties")
class JwtUsecase(
    @Value("\${jwt.secret-key}") private val SECRET_KEY: String
) {
    private val ACCESS_TOKEN_EXPIRATION: Long = 1800000L

    private val REFRESH_TOKEN_EXPIRATION: Long = 604800000L

    fun extractUsername(token: String): String {
        return extractClaim(token, Function<Claims, String> { obj: Claims -> obj.subject })
    }

    fun generateToken(userDetails: UserDetails): String {
        return generateToken(HashMap(), userDetails)
    }

    fun isValidToken(token: String, userDetails: UserDetails): Boolean {
        val username = extractUsername(token)
        return (username == userDetails.username) && !isTokenExpired(token)
    }

    fun generateRefreshToken(userDetails: UserDetails): String {
        return buildToken(HashMap(), userDetails, this.REFRESH_TOKEN_EXPIRATION)
    }

    fun isTokenExpired(token: String): Boolean {
        return extractExpiration(token).before(Date())
    }

    fun extractRoles(token: String): MutableList<*>? {
        return extractAllClaims(token).get("roles", MutableList::class.java)
    }

    private fun <T> extractClaim(token: String, claimResolver: java.util.function.Function<Claims, T>): T {
        val claims = extractAllClaims(token)
        return claimResolver.apply(claims)
    }

    private fun generateToken(extraClaims: MutableMap<String, Any>, userDetails: UserDetails): String {
        return buildToken(extraClaims, userDetails, this.ACCESS_TOKEN_EXPIRATION)
    }

    private fun extractExpiration(token: String): Date {
        return extractClaim(token, Function<Claims, Date> { obj: Claims -> obj.expiration })
    }

    private fun buildToken(extraClaims: MutableMap<String, Any>, userDetails: UserDetails, expiration: Long): String {
        return Jwts.builder()
            .setClaims(extraClaims)
            .setSubject(userDetails.username)
            .claim("roles", userDetails.authorities.map { it.authority })
            .setIssuedAt(Date(System.currentTimeMillis()))
            .setExpiration(Date(System.currentTimeMillis() + expiration))
            .signWith(getSignInKey(), SignatureAlgorithm.HS256)
            .compact()
    }

    private fun extractAllClaims(token: String): Claims {
        return Jwts.parserBuilder()
            .setSigningKey(getSignInKey())
            .build()
            .parseClaimsJws(token)
            .body
    }

    private fun getSignInKey(): Key {
        val keyBytes = Decoders.BASE64.decode(this.SECRET_KEY)
        return Keys.hmacShaKeyFor(keyBytes)
    }
}