import { useState, useCallback } from "react";
import { ChatHistory } from "@/models/ChatHistory";
import { Api } from "@/configs/Api";
import HttpStatus from "@/configs/HttpStatus";
import { toast } from "sonner";
import useAxios from "./useAxios";
import { UsagePackage } from "@/models/UsagePackage";

export type UserPromptRequest = {
  chatId?: string; 
  userId: string; 
  prompt: string;
  sessionId?: string;
  modelAlias: string;
}

export function useChatbotManager() {

  const api = useAxios()
  const [currentUsagePackage, setCurrentUsagePackage] = useState<UsagePackage | null>(null);
  const [chatHistories, setChatHistories] = useState<ChatHistory[]>([]);
  const [currentChat, setCurrentChat] = useState<ChatHistory | null>(null);
  const [loading, setLoading] = useState(false);
  const [chatHistoriesLoading, setChatHistoriesLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getCurrentUsagePackageOfUser = useCallback(async (userId: string) => {
    try {
      const response = await api.get(Api.UsagePackage.GET_CURRENT_USAGE_PACKAGE_OF_USER + userId);
      if (response.status === HttpStatus.OK) {
        // console.log(response.data.dataResponse)
        setCurrentUsagePackage(response.data.dataResponse)
      }
      else {
        toast.error('Có lỗi xảy ra khi đổi tên cuộc trò chuyện!')
      }
    }
    catch(err: any) {
      toast.error('Có lỗi xảy ra khi đổi tên cuộc trò chuyện!')
    }
  }, [])

  const renameChatTitle = useCallback(async (chatId: string, newTitle: string) => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams({ chatId, newTitle });
      const response = await api.put(`${Api.Chatbot.RENAME_CHAT_TITLE}?${params.toString()}`);
      if (response.status === HttpStatus.OK && response.data.dataResponse) {
        setChatHistories((prev) => prev.map(chat => chat.id === chatId ? { ...chat, chatTitle: newTitle } : chat));
        if (currentChat && currentChat.id === chatId) {
          setCurrentChat({ ...currentChat, chatTitle: newTitle });
        }
        toast.success("Đã đổi tên cuộc trò chuyện!");
        return response.data.dataResponse;
      } else {
        toast.error("Không thể đổi tên cuộc trò chuyện");
      }
    } catch (err: any) {
      toast.error("Có lỗi khi đổi tên cuộc trò chuyện");
      setError(err.message || "Unknown error");
      throw err;
    } finally {
      setLoading(false);
    }
  }, [api, currentChat]);


  const deleteChatHistory = useCallback(async (chatId: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.delete(Api.Chatbot.DELETE_HISTORY + chatId);
      if (response.status === HttpStatus.OK && response.data.dataResponse?.id === chatId) {
        setChatHistories((prev) => prev.filter(chat => chat.id !== chatId));
        if (currentChat && currentChat.id === chatId) {
          setCurrentChat(null);
        }
        toast.success("Đã xóa cuộc trò chuyện!");
        return response.data.dataResponse;
      } else {
        toast.error("Không thể xóa cuộc trò chuyện");
      }
    } catch (err: any) {
      toast.error("Có lỗi khi xóa cuộc trò chuyện");
      setError(err.message || "Unknown error");
      throw err;
    } finally {
      setLoading(false);
    }
  }, [api, currentChat]);
  

  // Get all chat histories of a user
  const getAllChatHistoriesOfUser = useCallback(async (userId: string) => {
    setChatHistoriesLoading(true);
    setError(null);
    try {
      const response = await api.get(Api.Chatbot.GET_ALL_CHAT_HISTORIES_OF_USER + userId);
      if (response.status === HttpStatus.OK) {
        // console.log(response.data.dataResponse)
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
  const askToGenerateWithAuthUser = useCallback(async (payload: UserPromptRequest): Promise<ChatHistory | undefined> => {
    // console.log(payload)
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
    return undefined;
  }, []);

  // Clear current chat
  const clearCurrentChat = useCallback(() => {
    setCurrentChat(null);
  }, []);

  // Add this function to allow adding a new chat to chatHistories
  const addChatHistory = useCallback((chat: ChatHistory) => {
    setChatHistories(prev => [chat, ...prev]);
  }, []);

  // Add this function to allow setting currentChat directly
  const setCurrentChatDirect = useCallback((chat: ChatHistory) => {
    setCurrentChat(chat);
  }, []);

  return {
    chatHistories,
    currentChat,
    loading,
    currentUsagePackage,
    chatHistoriesLoading,
    error,
    getCurrentUsagePackageOfUser,
    getAllChatHistoriesOfUser,
    askToGenerateWithAuthUser,
    clearCurrentChat,
    renameChatTitle,
    deleteChatHistory,
    addChatHistory,
    setCurrentChat: setCurrentChatDirect,
  };
}
