package swd392.lawservice.application.exception;

import lombok.Getter;
import lombok.Setter;
import org.springframework.stereotype.Component;

@Component("lawservice_CustomExceptions")
public class CustomExceptions {

    @Getter
    @Setter
    public static class ResourceNotFoundException extends RuntimeException {
        private String errorCode;
        public ResourceNotFoundException(String message) {
            super(message);
            this.errorCode = "RESOURCE_NOT_FOUND";
        }
    }

    @Getter
    @Setter
    public static class InternalServerException extends RuntimeException {
        private String errorCode;
        public InternalServerException(String message) {
            super(message);
            this.errorCode = "INTERNAL_SERVER_EXCEPTION";
        }
    }

}
