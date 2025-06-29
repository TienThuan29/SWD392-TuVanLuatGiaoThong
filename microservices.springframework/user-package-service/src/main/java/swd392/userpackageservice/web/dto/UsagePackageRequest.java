package swd392.userpackageservice.web.dto;

import lombok.Data;

@Data
public class UsagePackageRequest {

    String name;

    String description;

    float price;

    int dailyLimit;

    int daysLimit;

}
