package swd392.identityservice.infrastructure.transaction

import swd392.identityservice.domain.entity.User

interface IUserTransaction {

    fun updateUser(user: User): Boolean

}