package swd392.identityservice.web.dto

import jakarta.validation.constraints.NotBlank
import jakarta.validation.constraints.Size
import java.time.Instant

class UserInfoRequest (
    @NotBlank(message = "Fullname must not be blank")
    @Size(min = 1, max = 100, message = "Fullname must be between 1 and 100 characters")
    var fullname: String? = null,

    var avatarUrl: String? = null,

    var birthDay: Instant? = null,
)

class UpdatingUsernameAndPasswordRequest(
    @NotBlank(message = "Updating username must not be blank")
    var newUsername: String? = null,
    @NotBlank(message = "Updating password must not be blank")
    var newPassword: String? = null,
)

class PasswordChangeRequest(
    @NotBlank(message = "Old password must not be blank")
    var oldPassword: String? = null,
    @NotBlank(message = "New password must not be blank")
    var newPassword: String? = null,
)