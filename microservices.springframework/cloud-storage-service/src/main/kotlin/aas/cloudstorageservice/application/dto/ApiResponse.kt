package aas.cloudstorageservice.application.dto

import com.fasterxml.jackson.annotation.JsonProperty

data class ApiResponse<Any> (
    @JsonProperty("status")
    var status: String? = null,

    @JsonProperty("message")
    var message: String? = null,

    @JsonProperty("dataResponse")
    var dataResponse: Any? = null
)
