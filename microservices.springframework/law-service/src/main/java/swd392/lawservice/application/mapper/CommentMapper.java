package swd392.lawservice.application.mapper;

import org.springframework.stereotype.Component;
import swd392.lawservice.application.dto.CommentResponse;
import swd392.lawservice.domain.entity.Comment;
import swd392.lawservice.web.dto.CommentCreateRequest;
import swd392.lawservice.web.dto.CommentUpdateRequest;

@Component("commentMapper_LawService")
public class CommentMapper {
    public Comment toCreateEntity(CommentCreateRequest commentCreateRequest) {
        if (commentCreateRequest == null) return null;
        Comment comment = new Comment();
        comment.setUserName(commentCreateRequest.getUserName());
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
        response.setUserName(comment.getUserName());
        response.setContent(comment.getContent());
        response.setRating(comment.getRating());
        response.setCreatedDate(comment.getCreatedDate());
        response.setUpdatedDate(comment.getUpdatedDate());
        return response;
    }
}
