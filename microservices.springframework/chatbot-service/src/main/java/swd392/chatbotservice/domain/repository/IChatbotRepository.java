package swd392.chatbotservice.domain.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import swd392.chatbotservice.domain.entity.ChatHistory;

@Repository
public interface IChatbotRepository extends CrudRepository<ChatHistory, String> {
    
}
