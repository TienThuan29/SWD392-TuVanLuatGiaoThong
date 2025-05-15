package aas.cloudstorageservice.application.exception

import com.fasterxml.jackson.annotation.JsonProperty

class FolderNotFoundException(message: String) : RuntimeException() {
    @JsonProperty("message")
    override var message: String = message
}