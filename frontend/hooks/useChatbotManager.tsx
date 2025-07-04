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
  const [error, setError] = useState<string | null>(null);

  // Get all chat histories of a user
  const getAllChatHistoriesOfUser = useCallback(async (userId: string) => {
    setLoading(true);
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
      setLoading(false);
    }
  }, []);

  // Ask to generate (new or continue chat)
  const askToGenerateWithAuthUser = useCallback(async (payload: { chatId: string; userId: string; prompt: string }) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.post(Api.Chatbot.ASK_T0_GENERATE_WITH_AUTH_USER, payload);
      if (response.status === HttpStatus.OK) {
        setCurrentChat(response.data.dataResponse);
        return response.data.dataResponse;
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

  return {
    chatHistories,
    currentChat,
    loading,
    error,
    getAllChatHistoriesOfUser,
    askToGenerateWithAuthUser,
  };
}
