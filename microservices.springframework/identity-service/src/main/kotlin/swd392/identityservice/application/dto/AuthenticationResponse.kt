package swd392.identityservice.application.dto

import com.fasterxml.jackson.annotation.JsonProperty

data class AuthenticationResponse(
    @JsonProperty("accessToken")
    var accessToken: String,

    @JsonProperty("refreshToken")
    var refreshToken: String
)