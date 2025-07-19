package swd392.identityservice.infrastructure.transaction

import swd392.identityservice.domain.entity.User

interface ITokenTransaction {

    fun saveToken(user: User, jwtToken: String)

    fun revokeAllOldUserToken(user: User)

}