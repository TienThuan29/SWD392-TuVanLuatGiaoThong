package swd392.lawservice.web.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import swd392.lawservice.application.dto.ApiResponse;
import swd392.lawservice.application.usecase.ICommentUsecase;
import swd392.lawservice.web.dto.CommentCreateRequest;
import swd392.lawservice.web.dto.CommentUpdateRequest;

import java.util.UUID;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/law")
public class CommentController {

    private final ICommentUsecase commentUsecase;

    @GetMapping("/comment/get-all")
    public ResponseEntity<ApiResponse<?>> getAllComments(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
        return new ResponseEntity<>(this.commentUsecase.getAllComments(page, size), HttpStatus.OK);
    }

    @PostMapping("/comment/create")
    public ResponseEntity<ApiResponse<?>> createComment(@Valid @RequestBody CommentCreateRequest commentCreateRequest) {
        return new ResponseEntity<>(this.commentUsecase.createComment(commentCreateRequest), HttpStatus.CREATED);
    }

    @PutMapping("/comment/update")
    public ResponseEntity<ApiResponse<?>> updateComment(@Valid @RequestBody CommentUpdateRequest commentUpdateRequest) {
        return new ResponseEntity<>(this.commentUsecase.updateComment(commentUpdateRequest), HttpStatus.OK);
    }

    @DeleteMapping("/comment/delete/{id}")
    public ResponseEntity<ApiResponse<?>> deleteComment(@PathVariable UUID id) {
        this.commentUsecase.deleteComment(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

}
