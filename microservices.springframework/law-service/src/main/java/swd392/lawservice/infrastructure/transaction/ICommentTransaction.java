package swd392.lawservice.infrastructure.transaction;

import swd392.lawservice.domain.entity.Comment;
import java.util.UUID;

public interface ICommentTransaction {
    Comment save(Comment comment);

    void update(Comment comment);

    void delete(UUID commentId);
}
