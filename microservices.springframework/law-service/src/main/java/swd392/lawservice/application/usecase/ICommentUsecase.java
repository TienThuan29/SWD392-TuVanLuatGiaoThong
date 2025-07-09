package swd392.lawservice.application.usecase;

import org.springframework.data.domain.Page;
import swd392.lawservice.application.dto.CommentResponse;
import swd392.lawservice.domain.entity.Comment;
import swd392.lawservice.web.dto.CommentCreateRequest;
import swd392.lawservice.web.dto.CommentUpdateRequest;

import java.util.UUID;

public interface ICommentUsecase {
    Page<CommentResponse> getAllComments(int page, int size);

    Comment createComment(CommentCreateRequest commentCreateRequest);

    Comment updateComment(CommentUpdateRequest commentCreateRequest);

    void deleteComment(UUID commentId);
}
