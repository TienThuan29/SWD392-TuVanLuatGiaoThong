package swd392.lawservice.application.mapper;

import org.springframework.stereotype.Component;
import swd392.lawservice.application.dto.CommentResponse;
import swd392.lawservice.domain.entity.Comment;
import swd392.lawservice.web.dto.CommentCreateRequest;
import swd392.lawservice.web.dto.CommentUpdateRequest;

import java.util.UUID;

@Component("commentMapper_LawService")
public class CommentMapper {

    public Comment toEntity(CommentCreateRequest commentCreateRequest) {
        if (commentCreateRequest == null) return null;
        Comment comment = new Comment();
        comment.setId(UUID.randomUUID());
        comment.setUsername(commentCreateRequest.getUsername());
        comment.setFullname(commentCreateRequest.getFullname());
        comment.setAvatarUrl(commentCreateRequest.getAvatarUrl());
        comment.setAnonymous(commentCreateRequest.getIsAnonymous());
        comment.setContent(commentCreateRequest.getContent());
        comment.setRating(commentCreateRequest.getRating());
        return comment;
    }

    public void updateEntity(CommentUpdateRequest request, Comment comment) {
        if (request == null || comment == null) return;

        if (request.getContent() != null) {
            comment.setContent(request.getContent().trim());
        }

        comment.setRating(request.getRating());
    }

    public CommentResponse toResponse(Comment comment) {
        if (comment == null) return null;
        CommentResponse response = new CommentResponse();
        response.setId(comment.getId());
        response.setUsername(comment.getUsername());
        response.setContent(comment.getContent());
        response.setAvatarUrl(comment.getAvatarUrl());
        response.setRating(comment.getRating());
        response.setCreatedDate(comment.getCreatedDate());
        response.setUpdatedDate(comment.getUpdatedDate());
        return response;
    }
}
