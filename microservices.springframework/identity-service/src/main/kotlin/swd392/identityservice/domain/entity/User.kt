package swd392.identityservice.domain.entity

import swd392.identityservice.domain.fixed.Role
import jakarta.persistence.*
import org.springframework.security.core.GrantedAuthority
import org.springframework.security.core.userdetails.UserDetails
import java.time.Instant
import java.time.ZoneId
import java.time.ZonedDateTime
import java.util.*

@Entity
@Table(name = "users")
data class User(
    @Id
    var id: UUID? = UUID.randomUUID(),

    @Column(name = "username", length = 60, nullable = false, unique = true)
    var usernameAuth: String? = null,

    @Column(name = "email", length = 320, nullable = false)
    var email: String? = null,

    @Column(name = "password", length = 256, nullable = false)
    var passwordAuth: String? = null,

    @Column(name = "fullname", length = 100, nullable = false)
    var fullname: String? = null,

    @Column(name = "avatar_url", length = 1024)
    var avatarUrl: String? = null,

    @Column(name = "birthday")
    var birthDay: Date? = null,

    @Column(name = "is_enable")
    var isEnable: Boolean = false,

    @Column(name = "role")
    @Enumerated(EnumType.STRING)
    var role: Role? = null,

    @Column(name = "created_date", nullable = false)
    var createdDate: Instant? = null,

    @Column(name = "updated_date")
    var updatedDate: Instant? = null
)  : UserDetails {

    @PrePersist
    fun prePersist() {
        val zoneId = ZoneId.of("Asia/Ho_Chi_Minh");
        this.createdDate = ZonedDateTime.now(zoneId).toInstant();
    }

    override fun getAuthorities(): MutableCollection<out GrantedAuthority> {
        return this.role?.getAuthorities() ?: mutableListOf()
    }

    override fun getPassword(): String {
        return this.passwordAuth ?: ""
    }

    override fun getUsername(): String {
        return this.usernameAuth ?: ""
    }
}