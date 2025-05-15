package swd392.identityservice.application.dto

class UserDataResponse(
    var id: String? = null,
    var roleNumber: String? = null,
    var username: String? = null,
    var email: String? = null,
    var fullname: String? = null,
    var avatarUrl: String? = null,
    var birthDay: String? = null,
    var isEnable: Boolean = false,
    // var role: String? = null,
    var createdDate: String? = null,
    var updatedDate: String? = null,
    val role: String? = null
)