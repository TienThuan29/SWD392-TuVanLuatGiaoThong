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
import HeaderTop_C from '@/components/combination/HeaderTop_C'

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
      },
      {
        user: 'Vậy còn mức phạt khi không đội mũ bảo hiểm thì sao?',
        bot: 'Theo quy định hiện hành, mức phạt khi không đội mũ bảo hiểm khi tham gia giao thông bằng xe máy như sau:\n\n- Phạt tiền từ 200.000 đồng đến 300.000 đồng\n- Ngoài ra, người vi phạm còn bị tước quyền sử dụng giấy phép lái xe từ 1 đến 3 tháng\n\nLưu ý: Mũ bảo hiểm phải đạt chuẩn và được cài quai đúng quy cách.',
        date_time: '2024-03-20T10:02:00Z'
      },
      {
        user: 'Tôi muốn biết về quy định tốc độ tối đa trong khu vực đông dân cư',
        bot: 'Theo quy định tại Điều 6 Thông tư 31/2019/TT-BGTVT, tốc độ tối đa trong khu vực đông dân cư được quy định như sau:\n\n- Đối với xe ô tô con, xe ô tô khách đến 30 chỗ ngồi: 50 km/h\n- Đối với xe ô tô khách trên 30 chỗ ngồi: 40 km/h\n- Đối với xe mô tô, xe gắn máy: 40 km/h\n- Đối với xe máy chuyên dùng: 30 km/h\n\nLưu ý: Tốc độ này có thể được điều chỉnh thấp hơn tùy theo điều kiện giao thông thực tế.',
        date_time: '2024-03-20T10:03:00Z'
      },
      {
        user: 'Cảm ơn bạn. Cho tôi hỏi thêm về quy định về nồng độ cồn khi lái xe',
        bot: 'Theo quy định hiện hành về nồng độ cồn khi tham gia giao thông:\n\n1. Đối với người điều khiển xe ô tô:\n- Không được có nồng độ cồn trong máu hoặc hơi thở\n\n2. Đối với người điều khiển xe mô tô, xe gắn máy:\n- Nồng độ cồn trong máu không vượt quá 50 mg/100 ml máu\n- Nồng độ cồn trong khí thở không vượt quá 0,25 mg/1 lít khí thở\n\nMức phạt vi phạm:\n- Xe ô tô: Phạt tiền từ 6.000.000 đồng đến 8.000.000 đồng\n- Xe mô tô, xe gắn máy: Phạt tiền từ 2.000.000 đồng đến 3.000.000 đồng\n\nNgoài ra, người vi phạm còn bị tước quyền sử dụng giấy phép lái xe từ 10 đến 12 tháng.',
        date_time: '2024-03-20T10:04:00Z'
      },
      {
        user: 'Vậy khi bị tước giấy phép lái xe, tôi có thể xin cấp lại không?',
        bot: 'Theo quy định, việc cấp lại giấy phép lái xe sau khi bị tước phụ thuộc vào các yếu tố sau:\n\n1. Thời gian tước giấy phép lái xe đã hết\n2. Người vi phạm đã chấp hành xong quyết định xử phạt\n3. Đã nộp đầy đủ lệ phí cấp lại\n\nQuy trình xin cấp lại:\n- Nộp hồ sơ tại cơ quan quản lý giấy phép lái xe\n- Hồ sơ bao gồm: Đơn đề nghị, CMND/CCCD, ảnh thẻ, biên lai nộp phạt\n- Thời gian xử lý: 5-7 ngày làm việc\n\nLưu ý: Nếu vi phạm nghiêm trọng hoặc tái phạm nhiều lần, có thể bị từ chối cấp lại giấy phép lái xe.',
        date_time: '2024-03-20T10:05:00Z'
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

    try {
      const response = await fetch('http://localhost:8093/api/v1/chatbot/generate-from-pdf', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          prompt: inputMessage,
          // url: "SWD392/SWD392-TuVanLuatGiaoThong/microservices.springframework/chatbot-service/src/main/resources/trunguong.pdf" 
          url: "/trunguong.pdf"
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to get response from chatbot');
      }

      const data = await response.json();
      
      const aiMessage: Message = {
        id: Date.now() + 1,
        content: data.dataResponse?.response || 'Không thể lấy được câu trả lời. Vui lòng thử lại sau.',
        isUser: false,
        dateTime: new Date().toISOString()
      }
      setMessages((prev) => [...prev, aiMessage])
    } catch (error) {
      console.error('Error calling chatbot API:', error);
      
      const errorMessage: Message = {
        id: Date.now() + 1,
        content: 'Đã xảy ra lỗi khi kết nối với hệ thống. Vui lòng thử lại sau.',
        isUser: false,
        dateTime: new Date().toISOString()
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
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
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="sticky top-0 z-50 bg-white border-b border-gray-200/50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4">
          <HeaderTop_C />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex h-[calc(100vh-64px)]">
        {/* Mobile Sidebar Toggle */}
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="lg:hidden fixed top-20 left-4 z-50 p-2 rounded-lg bg-white shadow-md hover:bg-gray-50"
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
          className={`fixed lg:static w-80 border-r border-gray-200/50 bg-white/95 backdrop-blur-sm h-full transition-transform duration-300 ease-in-out z-40 ${
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

            <div className="flex h-16 items-center justify-between border-b border-gray-200/50 px-4">
              <h2 className="text-lg font-semibold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">Lịch sử chat</h2>
              <button className="rounded-full p-2 hover:bg-gray-50 transition-colors duration-200 border border-gray-200/50 hover:border-gray-300/50">
                <FaPlus className="h-5 w-5" style={{ color: Color.MainColor }} />
              </button>
            </div>

            <div className="overflow-y-auto flex-1 px-2 py-2">
              {sampleChatHistories.map((chat) => (
                <button
                  key={chat.id}
                  onClick={() => {
                    handleChatSelect(chat.id || '')
                    setIsSidebarOpen(false)
                  }}
                  className={`w-full px-4 py-3 text-left hover:bg-gray-50/80 transition-all duration-200 rounded-lg mb-1 border border-transparent hover:border-gray-200/50 ${
                    selectedChatId === chat.id 
                      ? 'bg-gray-50/80 border-gray-200/50 shadow-sm' 
                      : ''
                  }`}
                >
                  <div className="flex flex-col">
                    <span className="font-medium text-gray-900 line-clamp-1">{getChatTitle(chat)}</span>
                    <span className="text-xs text-gray-500 mt-0.5">
                      {chat.created_date ? new Date(chat.created_date).toLocaleDateString() : ''}
                    </span>
                  </div>
                </button>
              ))}
            </div>

            {/* User Profile Section */}
            <div className="border-t border-gray-200/50 p-4 bg-gray-50/50">
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage src="https://raw.githubusercontent.com/thangdevalone/modern-ui/refs/heads/main/public/assets/logo.png" alt="Default avatar" />
                  <AvatarFallback>MD</AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <span className="font-medium text-gray-900">Minh Đức</span>
                  <span className="text-xs text-gray-500">minhduc@example.com</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Chat Area */}
        <div className="flex flex-1 flex-col bg-gray-50">
          {/* Chat Container */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 min-h-0">
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
                    className={`rounded-lg px-4 py-2 ${message.isUser
                      ? 'text-white'
                      : 'bg-white text-gray-800 shadow-md'}`}
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

          {/* Input Area - Fixed at bottom */}
          <div className="sticky bottom-0 border-t border-gray-200 bg-white/95 backdrop-blur-sm p-4">
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
    </div>
  )
}
