package swd392.identityservice.application.mapper

import swd392.identityservice.application.dto.UserDataResponse
import swd392.identityservice.domain.entity.User
import swd392.identityservice.domain.fixed.Role
import swd392.identityservice.infrastructure.utils.HashingUtil
import swd392.identityservice.web.dto.RegisterUserRequest
import org.springframework.stereotype.Component

@Component("userMapper_IdentityService")
class UserMapper(
    private val hashingUtil: HashingUtil
) {

    fun toEntity(registerUserRequest: RegisterUserRequest) : User {
        return User(
            usernameAuth = registerUserRequest.username,
            email = registerUserRequest.email,
            passwordAuth = registerUserRequest.password,
            fullname = registerUserRequest.fullname,
            roleNumber = registerUserRequest.roleNumber,
            role = if(registerUserRequest.role.equals("STUDENT")) Role.STUDENT else Role.LECTURER
        )
    }

    fun toResponse(user: User) : UserDataResponse {
        return UserDataResponse(
            id = hashingUtil.hash(user.id.toString()),
            roleNumber = user.roleNumber,
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