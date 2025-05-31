package swd392.identityservice.application.usecase

import swd392.identityservice.application.dto.ApiResponse

interface IUserManagementUsecase {

    fun getAllUsers(): ApiResponse<Any>

    fun disableUser(id: String): ApiResponse<Any>

}