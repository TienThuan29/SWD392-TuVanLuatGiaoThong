package swd392.lawservice.web.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import swd392.lawservice.application.usecase.ILawUsecase;
import swd392.lawservice.web.dto.LawRequest;
import swd392.lawservice.application.dto.ApiResponse;
import java.util.UUID;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/law")
public class LawController {

    private ILawUsecase lawUsecase;

    @GetMapping("/health")
    public String healthCheck() {
        return "Law Service is running";
    }

    @PostMapping("/create")
    public ResponseEntity<ApiResponse<?>> createLaw(@RequestBody LawRequest lawRequest) {
        return new ResponseEntity<>(this.lawUsecase.createLaw(lawRequest), HttpStatus.OK);
    }

    @PutMapping("/deactivate/{id}")
    public ResponseEntity<ApiResponse<?>> deactivateLaw(@PathVariable("id") UUID id) {
        return new ResponseEntity<>(this.lawUsecase.deactivateLaw(id), HttpStatus.OK);
    }

    
    @PutMapping("/update/{id}")
    public ResponseEntity<ApiResponse<?>> updateLaw(@PathVariable UUID id,@RequestBody LawRequest lawRequest) {
        return new ResponseEntity<>(this.lawUsecase.updateLaw(id, lawRequest), HttpStatus.OK);
    }

    @GetMapping("/get/{id}")
    public ResponseEntity<ApiResponse<?>> getLawById(@PathVariable UUID id) {
        return new ResponseEntity<>(this.lawUsecase.getLawById(id), HttpStatus.OK);
    }

    @GetMapping("/getAll")
    public ResponseEntity<ApiResponse<?>> getAllLaw() {
        return new ResponseEntity<>(this.lawUsecase.getAllLaws(), HttpStatus.OK);
    }

    @PostMapping("/delete/{id}")
    public ResponseEntity<ApiResponse<?>> deleteLaw(@PathVariable UUID id) {
        return null;
    }

}
