package swd392.identityservice.domain.fixed

import org.springframework.security.core.authority.SimpleGrantedAuthority
import java.util.stream.Collectors

enum class Role(private val permissions: Set<Permission>) {

    USER(
        setOf(
            Permission.USER_READ,
            Permission.USER_UPDATE,
            Permission.USER_CREATE,
            Permission.USER_DELETE
        )
    ),
    ADMIN(
        setOf(
            Permission.ADMIN_READ,
            Permission.ADMIN_UPDATE,
            Permission.ADMIN_CREATE,
            Permission.ADMIN_DELETE
        )
    );

    fun getAuthorities(): MutableCollection<SimpleGrantedAuthority>{
        val authorities = permissions.stream()
            .map<SimpleGrantedAuthority> {
                permission: Permission -> SimpleGrantedAuthority(permission.permission)
            }
            .collect(Collectors.toList<SimpleGrantedAuthority>())
        authorities.add(SimpleGrantedAuthority("ROLE_" + this.name))
        return authorities
    }
}