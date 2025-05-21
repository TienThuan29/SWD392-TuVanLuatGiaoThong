package aas.cloudstorageservice.application.exception

import aas.cloudstorageservice.application.dto.ApiResponse
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.ExceptionHandler
import org.springframework.web.bind.annotation.RestControllerAdvice

@RestControllerAdvice
class GlobalExceptionHandler {

    @ExceptionHandler(FolderNotFoundException::class)
    fun handleException(exception: FolderNotFoundException): ResponseEntity<ApiResponse<Any>> {
        return ResponseEntity(
            ApiResponse(status = "not_found", message = exception.message, dataResponse = null),
            HttpStatus.NOT_FOUND
        );
    }

}