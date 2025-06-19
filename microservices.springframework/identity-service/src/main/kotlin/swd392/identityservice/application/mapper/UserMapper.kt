package swd392.identityservice.application.mapper

import swd392.identityservice.application.dto.UserDataResponse
import swd392.identityservice.domain.entity.User
import swd392.identityservice.domain.fixed.Role
import swd392.identityservice.infrastructure.utils.HashingUtil
import swd392.identityservice.web.dto.RegisterRequest
import org.springframework.stereotype.Component
import swd392.identityservice.web.dto.RegisterUserRequest

@Component("userMapper_IdentityService")
class UserMapper(
    private val hashingUtil: HashingUtil
) {

    fun toEntity(registerRequest: RegisterRequest) : User {
        return User(
            usernameAuth = registerRequest.username,
            email = registerRequest.email,
            passwordAuth = registerRequest.password,
            fullname = registerRequest.fullname,
            role = if(registerRequest.role.equals("USER")) Role.USER else Role.ADMIN,
        )
    }

    fun toEntity(registerUserRequest: RegisterUserRequest) : User {
        return User(
            usernameAuth = registerUserRequest.username,
            email = registerUserRequest.email,
            passwordAuth = registerUserRequest.password,
            fullname = registerUserRequest.fullname,
            role = Role.USER
        )
    }


    fun toResponse(user: User) : UserDataResponse {
        return UserDataResponse(
            id = hashingUtil.hash(user.id.toString()),
            username = user.usernameAuth,
            email = user.email,
            fullname = user.fullname,
            avatarUrl = user.avatarUrl,
            birthDay = user.birthDay.toString(),
            isEnable = user.isEnable,
            role = user.role?.name?.let { hashingUtil.hash(it) },
            createdDate = user.createdDate.toString(),
            updatedDate = user.updatedDate.toString()
        )
    }

}