package swd392.userpackageservice.web.dto;

import lombok.Data;

@Data
public class AIModelRequest {

    String modelName;

    String provider;

    String description;
}
