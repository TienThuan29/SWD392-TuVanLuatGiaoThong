package swd392.identityservice.application.usecase

import swd392.identityservice.application.dto.ApiResponse
import swd392.identityservice.application.dto.UserDataResponse
import swd392.identityservice.web.dto.PasswordChangeRequest
import swd392.identityservice.web.dto.UpdatingUsernameAndPasswordRequest
import swd392.identityservice.web.dto.UserInfoRequest

interface IUserUsecase {

    fun updateInfo(userId: String, userInfoRequest: UserInfoRequest) : ApiResponse<Any>

    fun updateUsernameAndPassword(userId: String, request: UpdatingUsernameAndPasswordRequest): ApiResponse<Any>

    fun changePassword(userId: String, changePasswordRequest: PasswordChangeRequest): ApiResponse<Any>
}