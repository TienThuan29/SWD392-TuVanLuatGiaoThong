'use client'
import React, { useState } from 'react'
import { IoSend } from 'react-icons/io5'
import { FaUser, FaRobot, FaPlus, FaHome, FaBars } from 'react-icons/fa'
import { ChatHistory } from '@/models/ChatHistory'
import Header_C from '@/components/combination/Header_C'
import Link from 'next/link'
import { Input } from '@/components/modern-ui/input'
import { Color } from '@/configs/CssConstant'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/modern-ui/avatar'

// Sample chat history data
const sampleChatHistories: ChatHistory[] = [
  {
    id: 'chat_001',
    user_id: 'user_001',
    history: [
      {
        user: 'Xin chào, tôi cần tư vấn về luật giao thông',
        bot: 'Chào bạn! Tôi rất vui được giúp đỡ bạn về các vấn đề liên quan đến luật giao thông. Bạn có thể cho tôi biết cụ thể bạn cần tư vấn về vấn đề gì không?',
        date_time: '2024-03-20T10:00:00Z'
      },
      {
        user: 'Tôi muốn biết về mức phạt khi vượt đèn đỏ',
        bot: 'Theo Nghị định 100/2019/NĐ-CP, mức phạt khi vượt đèn đỏ được quy định như sau:\n\n- Đối với xe ô tô: Phạt tiền từ 3.000.000 đồng đến 5.000.000 đồng\n- Đối với xe máy: Phạt tiền từ 1.000.000 đồng đến 2.000.000 đồng\n\nNgoài ra, người vi phạm còn bị tước quyền sử dụng giấy phép lái xe từ 1 đến 3 tháng.',
        date_time: '2024-03-20T10:01:00Z'
      }
    ],
    is_deleted: false,
    created_date: '2024-03-20T09:59:00Z'
  },
  {
    id: 'chat_002',
    user_id: 'user_001',
    history: [
      {
        user: 'Tôi cần tư vấn về việc đi sai làn đường',
        bot: 'Theo quy định hiện hành, mức phạt cho hành vi đi sai làn đường như sau:\n\n- Đối với xe ô tô: Phạt tiền từ 3.000.000 đồng đến 5.000.000 đồng\n- Đối với xe máy: Phạt tiền từ 400.000 đồng đến 600.000 đồng\n\nNgười vi phạm cũng có thể bị tước quyền sử dụng giấy phép lái xe từ 1 đến 3 tháng.',
        date_time: '2024-03-20T11:00:00Z'
      }
    ],
    is_deleted: false,
    created_date: '2024-03-20T10:59:00Z'
  }
]

interface Message {
  id: number
  content: string
  isUser: boolean
  dateTime?: string
}

export default function Page() {
  const [selectedChatId, setSelectedChatId] = useState<string>(sampleChatHistories[0]?.id || '')
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>(() => {
    const selectedChat = sampleChatHistories.find(chat => chat.id === selectedChatId)
    return selectedChat?.history?.map((chat, index) => [
      {
        id: index * 2,
        content: chat.user || '',
        isUser: true,
        dateTime: chat.date_time
      },
      {
        id: index * 2 + 1,
        content: chat.bot || '',
        isUser: false,
        dateTime: chat.date_time
      }
    ]).flat() || []
  })
  const [inputMessage, setInputMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return

    const userMessage: Message = {
      id: Date.now(),
      content: inputMessage,
      isUser: true,
      dateTime: new Date().toISOString()
    }
    setMessages((prev) => [...prev, userMessage])
    setInputMessage('')
    setIsLoading(true)

    setTimeout(() => {
      const aiMessage: Message = {
        id: Date.now() + 1,
        content: 'Đây là phản hồi mẫu từ hệ thống. Vui lòng tích hợp API thực tế để có phản hồi chính xác.',
        isUser: false,
        dateTime: new Date().toISOString()
      }
      setMessages((prev) => [...prev, aiMessage])
      setIsLoading(false)
    }, 1000)
  }

  const handleChatSelect = (chatId: string) => {
    setSelectedChatId(chatId)
    const selectedChat = sampleChatHistories.find(chat => chat.id === chatId)
    setMessages(selectedChat?.history?.map((chat, index) => [
      {
        id: index * 2,
        content: chat.user || '',
        isUser: true,
        dateTime: chat.date_time
      },
      {
        id: index * 2 + 1,
        content: chat.bot || '',
        isUser: false,
        dateTime: chat.date_time
      }
    ]).flat() || [])
  }

  const getChatTitle = (chat: ChatHistory) => {
    const firstMessage = chat.history?.[0]?.user
    return firstMessage ? `${firstMessage.slice(0, 30)}...` : 'Cuộc trò chuyện mới'
  }

  return (
    <>
      <div className="flex h-screen relative">
        {/* Mobile Sidebar Toggle */}
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-white shadow-md hover:bg-gray-50"
        >
          <FaBars className="h-6 w-6 text-gray-600" />
        </button>

        {/* Overlay for mobile */}
        {isSidebarOpen && (
          <div
            className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* Sidebar */}
        <div
          className={`fixed lg:static w-80 border-r border-gray-200 bg-white my-5 h-[calc(100vh-2.5rem)] transition-transform duration-300 ease-in-out z-40 ${
            isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
          }`}
        >
          <div className="flex flex-col h-full">
            <Link 
              href="/"
              className="group flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 transition-all duration-300 rounded-lg mx-2 my-1 hover:shadow-md active:scale-95 border border-gray-200/50 hover:border-gray-300/50 backdrop-blur-sm"
            >
              <div className="flex items-center justify-center w-9 h-9 rounded-full bg-white/80 group-hover:bg-white transition-colors duration-300 shadow-sm group-hover:shadow-md border border-gray-200/50 group-hover:border-gray-300/50">
                <FaHome className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" style={{ color: Color.MainColor }} />
              </div>
              <div className="flex flex-col">
                <span className="font-medium group-hover:text-gray-900 transition-colors duration-300">Trở về trang chủ</span>
                <span className="text-xs text-gray-400 group-hover:text-gray-500 transition-colors duration-300">Quay lại màn hình chính</span>
              </div>
            </Link>
            <div className="flex h-16 items-center justify-between border-b border-gray-200 px-4">
              <h2 className="text-lg font-semibold">Lịch sử chat</h2>
              <button className="rounded-full p-2 hover:bg-gray-100">
                <FaPlus className="h-5 w-5 text-gray-600" />
              </button>
            </div>
            <div className="overflow-y-auto flex-1">
              {sampleChatHistories.map((chat) => (
                <button
                  key={chat.id}
                  onClick={() => {
                    handleChatSelect(chat.id || '')
                    setIsSidebarOpen(false)
                  }}
                  className={`w-full px-4 py-3 text-left hover:bg-gray-50 ${selectedChatId === chat.id ? 'bg-gray-100' : ''}`}
                >
                  <div className="flex flex-col">
                    <span className="font-medium text-gray-900">{getChatTitle(chat)}</span>
                    <span className="text-sm text-gray-500">
                      {chat.created_date ? new Date(chat.created_date).toLocaleDateString() : ''}
                    </span>
                  </div>
                </button>
              ))}
            </div>
            {/* User Profile Section */}
            <div className="border-t border-gray-200 p-4">
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage src="https://raw.githubusercontent.com/thangdevalone/modern-ui/refs/heads/main/public/assets/logo.png" alt="Default avatar" />
                  <AvatarFallback>MD</AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <span className="font-medium text-gray-900">Minh Đức</span>
                  <span className="text-sm text-gray-500">minhduc@example.com</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Chat Area */}
        <div className="flex flex-1 flex-col bg-gray-50">
          {/* Chat Container */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex items-start gap-3 ${message.isUser ? 'justify-end' : 'justify-start'}`}
              >
                {!message.isUser && (
                  <div className="flex-shrink-0 flex h-8 w-8 items-center justify-center rounded-full" style={{ backgroundColor: Color.MainColor }}>
                    <FaRobot className="h-5 w-5 text-white" />
                  </div>
                )}
                <div className="flex flex-col min-w-0">
                  <div
                    className={`rounded-lg px-4 py-2 ${
                      message.isUser
                        ? 'text-white'
                        : 'bg-white text-gray-800 shadow-md'
                    }`}
                    style={message.isUser ? { backgroundColor: Color.MainColor } : {}}
                  >
                    <div className="whitespace-pre-wrap break-words">
                      {message.content}
                    </div>
                  </div>
                  {message.dateTime && (
                    <span className="mt-1 text-xs text-gray-500">
                      {new Date(message.dateTime).toLocaleTimeString()}
                    </span>
                  )}
                </div>
                {message.isUser && (
                  <div className="flex-shrink-0 flex h-8 w-8 items-center justify-center rounded-full bg-gray-500">
                    <FaUser className="h-5 w-5 text-white" />
                  </div>
                )}
              </div>
            ))}
            {isLoading && (
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 flex h-8 w-8 items-center justify-center rounded-full" style={{ backgroundColor: Color.MainColor }}>
                  <FaRobot className="h-5 w-5 text-white" />
                </div>
                <div className="flex items-center gap-2 rounded-lg bg-white px-4 py-2 shadow-md">
                  <div className="h-2 w-2 animate-bounce rounded-full bg-gray-400"></div>
                  <div className="h-2 w-2 animate-bounce rounded-full bg-gray-400 delay-100"></div>
                  <div className="h-2 w-2 animate-bounce rounded-full bg-gray-400 delay-200"></div>
                </div>
              </div>
            )}
          </div>

          {/* Input Area */}
          <div className="border-t border-gray-200 bg-white p-4">
            <div className="mx-auto flex max-w-4xl items-center gap-2">
              <Input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Nhập tin nhắn của bạn..."
                className="flex-1"
              />
              <button
                onClick={handleSendMessage}
                disabled={isLoading || !inputMessage.trim()}
                className="flex h-10 w-10 items-center justify-center rounded-lg text-white transition-colors hover:opacity-90 disabled:bg-gray-300"
                style={{ backgroundColor: Color.MainColor }}
              >
                <IoSend className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
