package swd392.lawservice.web.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;
import swd392.lawservice.application.dto.CommentResponse;
import swd392.lawservice.application.usecase.ICommentUsecase;
import swd392.lawservice.application.usecase.ILawTypeUsecase;
import swd392.lawservice.application.usecase.ILawUsecase;
import swd392.lawservice.domain.entity.Comment;
import swd392.lawservice.web.dto.CommentCreateRequest;
import swd392.lawservice.web.dto.CommentUpdateRequest;
import swd392.lawservice.web.dto.LawRequest;
import swd392.lawservice.application.dto.ApiResponse;
import java.util.UUID;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import swd392.lawservice.web.dto.LawTypeRequest;


@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/law")
public class LawController {

    private final ILawUsecase lawUsecase;

    private final ILawTypeUsecase lawTypeUsecase;

    private final ICommentUsecase commentUsecase;

    @GetMapping("/health")
    public String healthCheck() {
        return "Law Service is running";
    }

    @PostMapping("/admin/type/create")
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

    @PutMapping("/admin/type/update/{id}")
    public ResponseEntity<ApiResponse<?>> updateLawType(@PathVariable("id") UUID id, @RequestBody LawTypeRequest lawTypeRequest) {
        return new ResponseEntity<>(this.lawTypeUsecase.updateLawTypes(id, lawTypeRequest), HttpStatus.OK);
    }

    @PutMapping("/admin/type/deactivate/{id}")
    public ResponseEntity<ApiResponse<?>> deactivateLawType(UUID id) {
        return new ResponseEntity<>(this.lawTypeUsecase.deactivateLawType(id), HttpStatus.OK);
    }

    @PostMapping("/admin/create")
    public ResponseEntity<ApiResponse<?>> createLaw(@RequestBody LawRequest lawRequest) {
        return new ResponseEntity<>(this.lawUsecase.createLaw(lawRequest), HttpStatus.OK);
    }

    @PutMapping("/admin/deactivate/{id}")
    public ResponseEntity<ApiResponse<?>> deactivateLaw(@PathVariable("id") UUID id) {
        return new ResponseEntity<>(this.lawUsecase.deactivateLaw(id), HttpStatus.OK);
    }

    @PutMapping("/admin/update/{id}")
    public ResponseEntity<ApiResponse<?>> updateLaw(@PathVariable UUID id,@RequestBody LawRequest lawRequest) {
        return new ResponseEntity<>(this.lawUsecase.updateLaw(id, lawRequest), HttpStatus.OK);
    }

    @GetMapping("/get/{id}")
    public ResponseEntity<ApiResponse<?>> getLawById(@PathVariable UUID id) {
        return new ResponseEntity<>(this.lawUsecase.getLawById(id), HttpStatus.OK);
    }

    @GetMapping("/get-all")
    public ResponseEntity<ApiResponse<?>> getAllLaw() {
        return new ResponseEntity<>(this.lawUsecase.getAllLaws(), HttpStatus.OK);
    }

    @PostMapping("/admin/delete/{id}")
    public ResponseEntity<ApiResponse<?>> deleteLaw(@PathVariable UUID id) {
        return null;
    }

    @GetMapping("/comment/get-all")
    public ResponseEntity<Page<CommentResponse>> getAllComments(@RequestParam(defaultValue = "0") int page,
                                                                @RequestParam(defaultValue = "10") int size) {
        return new ResponseEntity<>(this.commentUsecase.getAllComments(page, size), HttpStatus.OK);
    }

    @PostMapping("/comment/create")
    public ResponseEntity<Comment> createComment(@Valid @RequestBody CommentCreateRequest commentCreateRequest) {
        return new ResponseEntity<>(this.commentUsecase.createComment(commentCreateRequest), HttpStatus.CREATED);
    }

    @PutMapping("/comment/update")
    public ResponseEntity<Comment> updateComment(@Valid @RequestBody CommentUpdateRequest commentUpdateRequest) {
        return new ResponseEntity<>(this.commentUsecase.updateComment(commentUpdateRequest), HttpStatus.OK);
    }

    @DeleteMapping("/comment/delete/{id}")
    public ResponseEntity<Void> deleteComment(@PathVariable UUID id) {
        this.commentUsecase.deleteComment(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
