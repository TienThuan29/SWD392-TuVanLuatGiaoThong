package swd392.identityservice.web.dto

import java.time.Instant

class UserInfoRequest (
    var fullname: String? = null,
    var avatarUrl: String? = null,
    var birthDay: Instant? = null,
)

class UpdatingUsernameAndPasswordRequest(
    var newUsername: String? = null,
    var newPassword: String? = null,
)

class PasswordChangeRequest(
    var oldPassword: String? = null,
    var newPassword: String? = null,
)