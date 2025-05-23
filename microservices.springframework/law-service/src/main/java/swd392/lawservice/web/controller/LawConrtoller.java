package swd392.lawservice.web.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;


@RestController
@RequestMapping("/api/v1/law")
public class LawConrtoller {
    
    @GetMapping("'/health")
    public String healthCheck() {
        return "Law Service is running";
    }
    

}
