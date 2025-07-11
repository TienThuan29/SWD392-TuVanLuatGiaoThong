package swd392.identityservice.web.controller

import lombok.RequiredArgsConstructor
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PutMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import swd392.identityservice.application.dto.ApiResponse
import swd392.identityservice.application.usecase.IUserUsecase
import swd392.identityservice.web.dto.PasswordChangeRequest
import swd392.identityservice.web.dto.UpdatingUsernameAndPasswordRequest
import swd392.identityservice.web.dto.UserInfoRequest

@RestController
@RequestMapping("/api/v1/users")
@RequiredArgsConstructor
class UserController(
    private val userUsecase: IUserUsecase
) {

    @PutMapping("/update/{userId}")
    fun updateUserInfo(
        @PathVariable("userId") userId: String, @RequestBody userInfoRequest: UserInfoRequest
    ): ResponseEntity<ApiResponse<Any>> {
        return ResponseEntity(this.userUsecase.updateInfo(userId, userInfoRequest), HttpStatus.OK)
    }

    @PutMapping("/update/username-password/{userId}")
    fun updateUsernameAndPassword(
        @PathVariable("userId") userId: String, @RequestBody request: UpdatingUsernameAndPasswordRequest
    ): ResponseEntity<ApiResponse<Any>> {
        return ResponseEntity(this.userUsecase.updateUsernameAndPassword(userId, request), HttpStatus.OK)
    }

    @PutMapping("/change-password/{userId}")
    fun changePassword(
        @PathVariable("userId") userId: String, @RequestBody changePasswordRequest: PasswordChangeRequest
    ): ResponseEntity<ApiResponse<Any>> {
        return ResponseEntity(this.userUsecase.changePassword(userId, changePasswordRequest), HttpStatus.OK)
    }
}