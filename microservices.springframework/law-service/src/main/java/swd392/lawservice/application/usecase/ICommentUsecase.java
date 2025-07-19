package swd392.lawservice.application.usecase;

import swd392.lawservice.application.dto.ApiResponse;
import swd392.lawservice.application.dto.CommentResponse;
import swd392.lawservice.web.dto.CommentCreateRequest;
import swd392.lawservice.web.dto.CommentUpdateRequest;
import java.util.List;
import java.util.UUID;

public interface ICommentUsecase {
    ApiResponse<List<CommentResponse>> getAllComments(int page, int size);

    ApiResponse<CommentResponse> createComment(CommentCreateRequest commentCreateRequest);

    ApiResponse<CommentResponse> updateComment(CommentUpdateRequest commentCreateRequest);

    ApiResponse<?> deleteComment(UUID commentId);
}
