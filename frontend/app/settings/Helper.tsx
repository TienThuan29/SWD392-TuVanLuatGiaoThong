'use client';

import { User } from '@/models/User';
import React, { useState } from 'react';
import { FiHelpCircle, FiMessageSquare, FiMail, FiPhone } from 'react-icons/fi';

type Props = {
  logedUser: User;
}

export default function Helper({ logedUser }: Props) {
  const [user, setUser] = useState<User>(logedUser);

  const faqs = [
    {
      question: 'Làm thế nào để đặt lịch tư vấn?',
      answer: 'Bạn có thể đặt lịch tư vấn bằng cách chọn gói dịch vụ phù hợp và điền thông tin liên hệ. Chúng tôi sẽ liên hệ lại với bạn trong vòng 24 giờ.'
    },
    {
      question: 'Thời gian tư vấn là bao lâu?',
      answer: 'Thời gian tư vấn tùy thuộc vào gói dịch vụ bạn chọn. Gói cơ bản có thời gian tư vấn 30 phút, gói premium 60 phút và gói doanh nghiệp không giới hạn thời gian.'
    },
    {
      question: 'Tôi có thể hủy lịch tư vấn không?',
      answer: 'Bạn có thể hủy lịch tư vấn trước 24 giờ mà không bị tính phí. Nếu hủy trong vòng 24 giờ, phí hủy sẽ được tính theo quy định.'
    }
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Trợ giúp & Hỗ trợ</h1>

      {/* Contact Information */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Liên hệ hỗ trợ</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-center space-x-3">
            <div className="bg-blue-50 p-3 rounded-full">
              <FiMessageSquare className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h3 className="font-medium">Chat trực tuyến</h3>
              <p className="text-sm text-gray-600">Hỗ trợ 24/7</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <div className="bg-blue-50 p-3 rounded-full">
              <FiMail className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h3 className="font-medium">Email</h3>
              <p className="text-sm text-gray-600">support@example.com</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <div className="bg-blue-50 p-3 rounded-full">
              <FiPhone className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h3 className="font-medium">Điện thoại</h3>
              <p className="text-sm text-gray-600">1900-1234</p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQs */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Câu hỏi thường gặp</h2>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="border-b border-gray-200 pb-4 last:border-0">
              <div className="flex items-start space-x-3">
                <div className="bg-blue-50 p-2 rounded-full mt-1">
                  <FiHelpCircle className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-medium mb-2">{faq.question}</h3>
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

