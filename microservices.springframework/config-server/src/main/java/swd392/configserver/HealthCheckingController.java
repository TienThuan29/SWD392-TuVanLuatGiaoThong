package swd392.configserver;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/configserver/health")
public class HealthCheckingController {
    
    @GetMapping
    public String health() {
        return "Config Server is up and running";
    }

}
