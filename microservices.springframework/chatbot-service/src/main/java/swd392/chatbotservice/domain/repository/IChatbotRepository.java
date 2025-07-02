package swd392.chatbotservice.domain.repository;

import org.springframework.stereotype.Repository;
import swd392.chatbotservice.domain.entity.ChatHistory;

import java.util.List;
import java.util.UUID;

@Repository
public interface IChatbotRepository  {

    public void save(ChatHistory chatHistory);

    public ChatHistory findById(UUID id);

    public void delete(ChatHistory chatHistory);

    public void update(ChatHistory chatHistory);

    public List<ChatHistory> findAll();

}
