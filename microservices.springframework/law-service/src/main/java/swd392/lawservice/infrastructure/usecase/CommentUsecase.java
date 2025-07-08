package swd392.lawservice.infrastructure.usecase;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import swd392.lawservice.application.dto.CommentResponse;
import swd392.lawservice.application.mapper.CommentMapper;
import swd392.lawservice.application.usecase.ICommentUsecase;
import swd392.lawservice.domain.entity.Comment;
import swd392.lawservice.domain.repository.CommentRepository;
import swd392.lawservice.domain.repository.ITransactionComment;
import swd392.lawservice.web.dto.CommentCreateRequest;
import swd392.lawservice.web.dto.CommentUpdateRequest;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class CommentUsecase implements ICommentUsecase {
    private final ITransactionComment transactionComment;
    private final CommentRepository commentRepository;
    private final CommentMapper commentMapper;

    @Override
    public Page<CommentResponse> getAllComments(int page, int size) {
        Page<Comment> commentsPage = commentRepository.findAll(PageRequest.of(page, size));
        return commentsPage.map(commentMapper::toResponse);
    }

    @Override
    public Comment createComment(CommentCreateRequest commentCreateRequest) {
        Comment savedComment = transactionComment.save(commentMapper.toCreateEntity(commentCreateRequest));
        return commentRepository.findById(savedComment.getId())
                .orElseThrow(() -> new RuntimeException("Comment not found after creation"));
    }

    @Override
    public Comment updateComment(CommentUpdateRequest request) {
        Comment comment = commentRepository.findById(request.getId())
                .orElseThrow(() -> new EntityNotFoundException("Comment not found"));

        commentMapper.updateEntity(request, comment);
        return commentRepository.save(comment);
    }

    @Override
    public void deleteComment(UUID commentId) {
        if (!commentRepository.existsById(commentId)) {
            throw new RuntimeException("Comment not found for deletion");
        }
        transactionComment.delete(commentId);
    }

}
