import { useState, useCallback } from "react";
import { ChatHistory } from "@/models/ChatHistory";
import { Api } from "@/configs/Api";
import HttpStatus from "@/configs/HttpStatus";
import { toast } from "sonner";
import useAxios from "./useAxios";


export function useChatbotManager() {

  const api = useAxios()
  const [chatHistories, setChatHistories] = useState<ChatHistory[]>([]);
  const [currentChat, setCurrentChat] = useState<ChatHistory | null>(null);
  const [loading, setLoading] = useState(false);
  const [chatHistoriesLoading, setChatHistoriesLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Get all chat histories of a user
  const getAllChatHistoriesOfUser = useCallback(async (userId: string) => {
    setChatHistoriesLoading(true);
    setError(null);
    try {
      const response = await api.get(Api.Chatbot.GET_ALL_CHAT_HISTORIES_OF_USER + userId);
      if (response.status === HttpStatus.OK) {
        setChatHistories(response.data.dataResponse);
      } else {
        toast.error("Có lỗi xảy ra khi lấy lịch sử chat");
      }
    } catch (err: any) {
      toast.error("Có lỗi xảy ra khi lấy lịch sử chat");
      setError(err.message || "Unknown error");
      console.log(err.message);
    } finally {
      setChatHistoriesLoading(false);
    }
  }, []);

  // Ask to generate (new or continue chat)
  const askToGenerateWithAuthUser = useCallback(async (payload: { chatId: string; userId: string; prompt: string }) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.post(Api.Chatbot.ASK_T0_GENERATE_WITH_AUTH_USER, payload);
      if (response.status === HttpStatus.OK && response.data.status == 'success') {
        setCurrentChat(response.data.dataResponse);
        return response.data.dataResponse;
      }
      else if (response.status === HttpStatus.OK && response.data.status == 'fail') {
        toast.error("Bạn đã vượt qua số  lượt hỏi trong ngày!");
      }
      else {
        toast.error("Có lỗi xảy ra khi tạo nội dung chat");
      }
    }
    catch (err: any) {
      toast.error("Có lỗi xảy ra khi tạo nội dung chat");
      setError(err.message || "Unknown error");
      throw err;
    }
    finally {
      setLoading(false);
    }
  }, []);

  // Clear current chat
  const clearCurrentChat = useCallback(() => {
    setCurrentChat(null);
  }, []);

  return {
    chatHistories,
    currentChat,
    loading,
    chatHistoriesLoading,
    error,
    getAllChatHistoriesOfUser,
    askToGenerateWithAuthUser,
    clearCurrentChat,
  };
}
