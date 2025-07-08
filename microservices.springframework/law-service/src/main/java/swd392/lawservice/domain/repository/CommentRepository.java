package swd392.lawservice.domain.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import swd392.lawservice.domain.entity.Comment;

import java.util.List;
import java.util.UUID;

@Repository
public interface CommentRepository extends JpaRepository<Comment, UUID> {


    List<Comment> findByUserName(String userName);

    List<Comment> findByRating(int rating);

}
