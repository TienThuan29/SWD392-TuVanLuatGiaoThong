package swd392.identityservice.domain.entity

import jakarta.persistence.*

@Entity
@Table(name = "tokens")
data class Token(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    var id: Long? = null,

    @Column(name = "token", nullable = false, length = 1024)
    var token: String? = null,

    @Column(name = "token_type", nullable = false)
    var tokenType: String = "BEARER",

    @Column(name = "revoked")
    var revoked: Boolean = false,

    @Column(name = "expired")
    var expired: Boolean = false,

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    var user: User? = null
) {
}