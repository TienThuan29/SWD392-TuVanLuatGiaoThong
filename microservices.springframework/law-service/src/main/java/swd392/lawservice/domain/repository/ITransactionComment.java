package swd392.lawservice.domain.repository;

import swd392.lawservice.domain.entity.Comment;

import java.util.UUID;

public interface ITransactionComment {
    Comment save(Comment comment);

    void update(Comment comment);

    void delete(UUID commentId);
}
