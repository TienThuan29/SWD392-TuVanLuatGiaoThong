package swd392.identityservice.web.controller

import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PutMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import swd392.identityservice.application.dto.ApiResponse
import swd392.identityservice.application.usecase.IUserManagementUsecase

@RestController
@RequestMapping("/api/v1/admin/user-management")
class   UserManagementController(
    private val userManagementUsecase: IUserManagementUsecase
) {

    @GetMapping("/users")
    fun getAllUsers(): ResponseEntity<ApiResponse<Any>> {
        return ResponseEntity(userManagementUsecase.getAllUsers(), HttpStatus.OK)
    }

    @PutMapping("/disable/{id}")
    fun disableUser(@PathVariable("id") id: String): ResponseEntity<ApiResponse<Any>> {
        return ResponseEntity(userManagementUsecase.disableUser(id), HttpStatus.OK)
    }

}