package swd392.identityservice.application.exception

import jakarta.servlet.http.HttpServletRequest
import jakarta.validation.ConstraintViolation
import jakarta.validation.ConstraintViolationException
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.validation.FieldError
import org.springframework.web.bind.MethodArgumentNotValidException
import org.springframework.web.bind.annotation.ExceptionHandler
import org.springframework.web.bind.annotation.RestControllerAdvice
import java.time.LocalDateTime
import java.time.ZonedDateTime
import java.util.function.Consumer

@RestControllerAdvice
class GlobalExceptionHandler {

    @ExceptionHandler(MethodArgumentNotValidException::class)
    fun handleValidationExceptions(
        ex: MethodArgumentNotValidException
    ): ResponseEntity<ValidationErrorResponse?> {
        val errors: MutableMap<String?, String?> = HashMap<String?, String?>()
        ex.getBindingResult().getFieldErrors()
            .forEach(Consumer { error: FieldError? -> errors.put(error!!.getField(), error.getDefaultMessage()) }
            )

        val validationErrorResponse: ValidationErrorResponse? = ValidationErrorResponse(
            status = HttpStatus.BAD_REQUEST.value(),
            message = "Validation failed",
            errors = errors,
            timestamp = LocalDateTime.now()
        )

        return ResponseEntity<ValidationErrorResponse?>(
            validationErrorResponse,
            HttpStatus.BAD_REQUEST
        )
    }

    @ExceptionHandler(ConstraintViolationException::class)
    fun handleConstraintViolationException(
        ex: ConstraintViolationException
    ): ResponseEntity<ValidationErrorResponse?> {
        val errors: MutableMap<String?, String?> = HashMap<String?, String?>()
        ex.getConstraintViolations().forEach(Consumer { violation: ConstraintViolation<*>? ->
            val fieldName: String? = violation!!.getPropertyPath().toString()
            val message = violation.getMessage()
            errors.put(fieldName, message)
        })

        val validationErrorResponse: ValidationErrorResponse? = ValidationErrorResponse(
            status = HttpStatus.BAD_REQUEST.value(),
            message = "Validation failed",
            errors = errors,
            timestamp = LocalDateTime.now()
        )

        return ResponseEntity<ValidationErrorResponse?>(
            validationErrorResponse,
            HttpStatus.BAD_REQUEST
        )
    }

    @ExceptionHandler(InternalServerException::class)
    fun handleResourceNotFound(ex: InternalServerException, request: HttpServletRequest): ResponseEntity<ErrorResponse> {
        val errorResponse = ErrorResponse(
            timestamp = ZonedDateTime.now().toString(),
            status = HttpStatus.INTERNAL_SERVER_ERROR.value(),
            error = HttpStatus.INTERNAL_SERVER_ERROR.reasonPhrase,
            message = ex.message,
            path = request.requestURI
        )
        return ResponseEntity(errorResponse, HttpStatus.INTERNAL_SERVER_ERROR)
    }

    @ExceptionHandler(ResourceNotFoundException::class)
    fun handleResourceNotFound(ex: ResourceNotFoundException, request: HttpServletRequest): ResponseEntity<ErrorResponse> {
        val errorResponse = ErrorResponse(
            timestamp = ZonedDateTime.now().toString(),
            status = HttpStatus.NOT_FOUND.value(),
            error = HttpStatus.NOT_FOUND.reasonPhrase,
            message = ex.message,
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
            message = ex.message,
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
