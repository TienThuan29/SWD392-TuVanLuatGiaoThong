package swd392.lawservice.infrastructure.transaction;

import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import swd392.lawservice.domain.entity.Comment;
import swd392.lawservice.domain.repository.CommentRepository;
import java.util.UUID;

@Service
@Transactional
public class CommentTransaction implements ICommentTransaction {
    private final CommentRepository commentRepository;
    public CommentTransaction(CommentRepository commentRepository) {
        this.commentRepository = commentRepository;
    }

    @Override
    public Comment save(Comment comment) {
        commentRepository.save(comment);
        return comment;
    }

    @Override
    public void update(Comment comment) {
        if (!commentRepository.existsById(comment.getId())) {
            throw new EntityNotFoundException("Comment not found for update");
        }
        commentRepository.save(comment);
    }

    @Override
    public void delete(UUID commentId) {
        if (!commentRepository.existsById(commentId)) {
            throw new EntityNotFoundException("Comment not found");
        }
        commentRepository.deleteById(commentId);
    }
}
