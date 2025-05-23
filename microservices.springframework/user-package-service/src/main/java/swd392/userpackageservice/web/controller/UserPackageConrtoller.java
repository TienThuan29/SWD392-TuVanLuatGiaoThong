package swd392.userpackageservice.web.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;


@RestController
@RequestMapping("/api/v1/user-packages")
public class UserPackageConrtoller {
    
    @GetMapping("/health")
    public String healthCheck() {
        return "User Package Service is running!";
    }
    

}
