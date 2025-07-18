package swd392.identityservice.application.exception

class ResourceNotFoundException(
    override val message: String,
    val errorCode: String = "RESOURCE_NOT_FOUND"
) : RuntimeException(message)

class UserNotFoundException(
    override val message: String = "User not found",
    errorCode: String = "USER_NOT_FOUND"
) : RuntimeException(message)

class InternalServerException(
    override val message: String = "Internal server error",
    val errorCode: String = "INTERNAL_SERVER_ERROR"
) : RuntimeException(message)