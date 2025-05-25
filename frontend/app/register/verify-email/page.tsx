"use client";

import React, { useState } from 'react';
import { Button } from "@/components/modern-ui/button";
import { Input } from "@/components/modern-ui/input";
import { toast } from "sonner";
import { Color } from "@/configs/CssConstant";
import { FaArrowLeft } from "react-icons/fa";

export default function Page() {
  const [verificationCode, setVerificationCode] = useState(['', '', '', '', '', '']);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (index: number, value: string) => {
    if (value.length > 1) return; // Prevent multiple characters
    
    const newCode = [...verificationCode];
    newCode[index] = value;
    setVerificationCode(newCode);

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.querySelector(`input[name=code-${index + 1}]`) as HTMLInputElement;
      if (nextInput) nextInput.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !verificationCode[index] && index > 0) {
      const prevInput = document.querySelector(`input[name=code-${index - 1}]`) as HTMLInputElement;
      if (prevInput) prevInput.focus();
    }
  };

  const handleSubmit = async () => {
    const code = verificationCode.join('');
    if (code.length !== 6) {
      toast.error("Vui lòng nhập đầy đủ mã xác thực!");
      return;
    }

    try {
      setIsLoading(true);
      // TODO: Add your verification API call here
      toast.success("Xác thực email thành công!");
    } catch (error) {
      toast.error("Xác thực thất bại. Vui lòng thử lại!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-indigo-100 px-4">
      <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-8">
        <h2 className="text-3xl font-semibold text-center mb-6 text-gray-900">
          Xác thực Email
        </h2>
        
        <p className="text-gray-600 text-center mb-8">
          Vui lòng nhập mã xác thực 6 chữ số đã được gửi đến email của bạn
        </p>

        <div className="flex justify-center gap-2 mb-8">
          {verificationCode.map((digit, index) => (
            <Input
              key={index}
              name={`code-${index}`}
              type="text"
              maxLength={1}
              value={digit}
              onChange={(e) => handleInputChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              className="w-12 h-12 text-center text-2xl focus:ring-indigo-500 focus:border-indigo-500"
              disabled={isLoading}
            />
          ))}
        </div>

        <Button
          onClick={handleSubmit}
          disabled={isLoading}
          className="w-full bg-maincolor text-white font-semibold py-3 rounded-md shadow-md hover:bg-[#005bb5] transition disabled:opacity-50 disabled:cursor-not-allowed mb-4"
          style={{ backgroundColor: Color.MainColor }}
        >
          {isLoading ? "Đang xác thực..." : "Xác thực"}
        </Button>

        <div className="flex justify-between text-sm">
          <a
            href="/register"
            className="inline-flex items-center text-indigo-600 hover:text-indigo-800 transition"
          >
            <FaArrowLeft className="w-4 h-4 mr-1" />
            Quay lại đăng ký
          </a>
          <button
            onClick={() => toast.info("Mã xác thực mới đã được gửi!")}
            className="text-indigo-600 hover:text-indigo-800 transition"
          >
            Gửi lại mã
          </button>
        </div>
      </div>
    </div>
  );
}
