package swd392.identityservice.domain.fixed

import org.springframework.security.core.authority.SimpleGrantedAuthority
import java.util.stream.Collectors

enum class Role(private val permissions: Set<Permission>) {

    STUDENT(
        setOf(
            Permission.STUDENT_READ,
            Permission.STUDENT_UPDATE,
            Permission.STUDENT_CREATE,
            Permission.STUDENT_DELETE
        )
    ),
    LECTURER(
        setOf(
            Permission.LECTURER_READ,
            Permission.LECTURER_UPDATE,
            Permission.LECTURER_CREATE,
            Permission.LECTURER_DELETE
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