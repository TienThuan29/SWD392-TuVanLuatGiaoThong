package swd392.identityservice.domain.repository

import swd392.identityservice.domain.entity.User

interface IUserTransaction {

    fun updateUser(user: User): Boolean

}