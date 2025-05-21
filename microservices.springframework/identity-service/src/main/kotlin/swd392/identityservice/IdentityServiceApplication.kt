package swd392.identityservice

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication
import org.springframework.cloud.openfeign.EnableFeignClients

@SpringBootApplication
@EnableFeignClients
class IdentityServiceApplication

fun main(args: Array<String>) {
    runApplication<IdentityServiceApplication>(*args)
}
// package swd392.identityservice;

// import org.springframework.boot.SpringApplication;
// import org.springframework.boot.autoconfigure.SpringBootApplication;
// import org.springframework.cloud.openfeign.EnableFeignClients;

// @SpringBootApplication
// @EnableFeignClients
// public class IdentityServiceApplication {

//     public static void main(String[] args) {
//         SpringApplication.run(IdentityServiceApplication.class, args);
//     }
// }
