package swd392.identityservice.application.exception

import jakarta.servlet.http.HttpServletRequest
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.ExceptionHandler
import org.springframework.web.bind.annotation.RestControllerAdvice
import java.time.ZonedDateTime

@RestControllerAdvice
class GlobalExceptionHandler {

    @ExceptionHandler(ResourceNotFoundException::class)
    fun handleResourceNotFound(ex: ResourceNotFoundException, request: HttpServletRequest): ResponseEntity<ErrorResponse> {
        val errorResponse = ErrorResponse(
            timestamp = ZonedDateTime.now().toString(),
            status = HttpStatus.NOT_FOUND.value(),
            error = HttpStatus.NOT_FOUND.reasonPhrase,
            message = ex.message ?: "Resource not found",
            path = request.requestURI
        )
        return ResponseEntity(errorResponse, HttpStatus.NOT_FOUND)
    }

    @ExceptionHandler(UserNotFoundException::class)
    fun handleResourceNotFound(ex: UserNotFoundException, request: HttpServletRequest): ResponseEntity<ErrorResponse> {
        val errorResponse = ErrorResponse(
            timestamp = ZonedDateTime.now().toString(),
            status = HttpStatus.NOT_FOUND.value(),
            error = HttpStatus.NOT_FOUND.reasonPhrase,
            message = ex.message ?: "User not found",
            path = request.requestURI
        )
        return ResponseEntity(errorResponse, HttpStatus.NOT_FOUND)
    }

    @ExceptionHandler(Exception::class)
    fun handleGenericException(ex: Exception, request: HttpServletRequest): ResponseEntity<ErrorResponse> {
        val errorResponse = ErrorResponse(
            timestamp = ZonedDateTime.now().toString(),
            status = HttpStatus.INTERNAL_SERVER_ERROR.value(),
            error = HttpStatus.INTERNAL_SERVER_ERROR.reasonPhrase,
            message = ex.message ?: "Internal server error",
            path = request.requestURI
        )
        return ResponseEntity(errorResponse, HttpStatus.INTERNAL_SERVER_ERROR)
    }
}
