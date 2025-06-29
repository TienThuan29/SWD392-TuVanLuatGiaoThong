package swd392.userpackageservice.application.exception;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import java.time.ZonedDateTime;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(CustomExceptions.ResourceNotFoundException.class)
    public ResponseEntity<ErrorResponse> handleResourceNotFound(
            CustomExceptions.ResourceNotFoundException ex, HttpServletRequest request
    ) {
        var errorResponse = ErrorResponse.builder()
                .timestamp(ZonedDateTime.now().toString())
                .status(HttpStatus.NOT_FOUND.value())
                .error(HttpStatus.NOT_FOUND.getReasonPhrase())
                .message(ex.getMessage() == null ? "Resource not found": ex.getMessage())
                .path(request.getRequestURI())
                .build();
        return new ResponseEntity<>(errorResponse, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(CustomExceptions.InternalServerException.class)
    public ResponseEntity<ErrorResponse> handleResourceNotFound(
            CustomExceptions.InternalServerException ex, HttpServletRequest request
    ) {
        var errorResponse = ErrorResponse.builder()
                .timestamp(ZonedDateTime.now().toString())
                .status(HttpStatus.INTERNAL_SERVER_ERROR.value())
                .error(HttpStatus.INTERNAL_SERVER_ERROR.getReasonPhrase())
                .message(ex.getMessage() == null ? "Internal server exception": ex.getMessage())
                .path(request.getRequestURI())
                .build();
        return new ResponseEntity<>(errorResponse, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
