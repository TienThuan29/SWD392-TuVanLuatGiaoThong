package swd392.lawservice.web.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import swd392.lawservice.application.usecase.ILawTypeUsecase;
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
import swd392.lawservice.web.dto.LawTypeRequest;


@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/law")
public class LawController {

    private ILawUsecase lawUsecase;

    private ILawTypeUsecase lawTypeUsecase;

    @GetMapping("/health")
    public String healthCheck() {
        return "Law Service is running";
    }

    @PostMapping("/type/create")
    public ResponseEntity<ApiResponse<?>> createLawType(@RequestBody LawTypeRequest lawTypeRequest) {
        return new ResponseEntity<>(this.lawTypeUsecase.createLawType(lawTypeRequest), HttpStatus.OK);
    }

    @GetMapping("/type/get-all")
    public ResponseEntity<ApiResponse<?>> getAllLawTypes() {
        return new ResponseEntity<>(this.lawTypeUsecase.getAllLawTypes(), HttpStatus.OK);
    }

    @GetMapping("/type/get/{id}")
    public ResponseEntity<ApiResponse<?>> getLawTypeById(@PathVariable("id") UUID id) {
        return new ResponseEntity<>(this.lawTypeUsecase.getLawTypeById(id), HttpStatus.OK);
    }

    @PutMapping("/type/update/{id}")
    public ResponseEntity<ApiResponse<?>> updateLawType(@PathVariable("id") UUID id, @RequestBody LawTypeRequest lawTypeRequest) {
        return new ResponseEntity<>(this.lawTypeUsecase.updateLawTypes(id, lawTypeRequest), HttpStatus.OK);
    }

    @PutMapping("/type/deactivate/{id}")
    public ResponseEntity<ApiResponse<?>> deactivateLawType(UUID id) {
        return new ResponseEntity<>(this.lawTypeUsecase.deactivateLawType(id), HttpStatus.OK);
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
