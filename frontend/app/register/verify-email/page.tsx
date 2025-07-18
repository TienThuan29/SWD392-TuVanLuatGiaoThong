"use client";

import React, { useState } from 'react';
import { Button } from "@/components/modern-ui/button";
import { Input } from "@/components/modern-ui/input";
import { toast } from "sonner";
import { Color } from "@/configs/CssConstant";
import { FaArrowLeft } from "react-icons/fa";
import { useSearchParams } from 'next/navigation';
import axios from 'axios';
import { Api } from '@/configs/Api';
import HttpStatus from '@/configs/HttpStatus';
import Constant from '@/configs/Constant';
import { ThemeToggle_C } from "@/components/ui/ThemeToggle_C";

export default function Page() {

  const searchParams = useSearchParams();
  // Get param email from /register/index
  const email = searchParams.get('email');

  const [verificationCode, setVerificationCode] = useState(['', '', '', '', '', '']);
  const [isLoading, setIsLoading] = useState(false);
  const [isVerified, setIsVerified] = useState(false);

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
      const response = await axios.post(Api.BASE_API + Api.Authenticaion.VERIFY_OTP, {
        email: email,
        sixDigitsOtp: code
      });
      if (response.status == HttpStatus.OK && response.data.status == 'success') {
        toast.success("Xác thực email thành công!");
        setIsVerified(true);
      }
      else if (response.status == HttpStatus.OK && response.data.status == 'fail') {
        toast.warning(response.data.message)
      }
    } 
    catch (error) {
      toast.error("Xác thực thất bại. Vui lòng thử lại!");
    } 
    finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-gray-900 dark:to-gray-800 px-4 transition-colors duration-200">
      {/* Theme Toggle - Fixed position */}
      <div className="fixed top-4 right-4 z-50">
        <ThemeToggle_C />
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-md w-full p-8 border border-gray-200/50 dark:border-gray-700/50 transition-colors duration-200">
        <h2 className="text-3xl font-semibold text-center mb-6 text-gray-900 dark:text-white">
          Xác thực Email
        </h2>
        
        {isVerified ? (
          <div className="text-center">
            <div className="text-green-600 dark:text-green-400 text-6xl mb-4">✓</div>
            <p className="text-green-600 dark:text-green-400 text-lg font-medium mb-6">
              Xác thực email thành công!
            </p>
            <p className="text-gray-600 dark:text-gray-300 mb-8">
              Tài khoản của bạn đã được kích hoạt. Bạn có thể đăng nhập ngay bây giờ.
            </p>
            <Button
              onClick={() => window.location.href = Constant.Page.LoginPage}
              className="w-full bg-maincolor text-white font-semibold py-3 rounded-md shadow-md hover:bg-[#005bb5] dark:hover:bg-[#004a99] transition-colors"
              style={{ backgroundColor: Color.MainColor }}
            >
              Trở về trang đăng nhập
            </Button>
          </div>
        ) : (
          <>
            <p className="text-gray-600 dark:text-gray-300 text-center mb-8">
              Vui lòng nhập mã xác thực 6 chữ số đã được gửi đến email của bạn
            </p>

            {email && (
              <p className="text-gray-700 dark:text-gray-300 text-center mb-6 font-medium">
                Email: <span className="text-indigo-600 dark:text-indigo-400">{email}</span>
              </p>
            )}

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
                  className="w-12 h-12 text-center text-2xl focus:ring-indigo-500 focus:border-indigo-500 dark:focus:ring-indigo-400 dark:focus:border-indigo-400 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  disabled={isLoading}
                />
              ))}
            </div>

            <Button
              onClick={handleSubmit}
              disabled={isLoading}
              className="w-full bg-maincolor text-white font-semibold py-3 rounded-md shadow-md hover:bg-[#005bb5] dark:hover:bg-[#004a99] transition-colors disabled:opacity-50 disabled:cursor-not-allowed mb-4"
              style={{ backgroundColor: Color.MainColor }}
            >
              {isLoading ? "Đang xác thực..." : "Xác thực"}
            </Button>

            <div className="flex justify-between text-sm">
              <a
                href="/register"
                className="inline-flex items-center text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 transition-colors"
              >
                <FaArrowLeft className="w-4 h-4 mr-1" />
                Quay lại đăng ký
              </a>
              <button
                onClick={() => toast.info("Mã xác thực mới đã được gửi!")}
                className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 transition-colors"
              >
                Gửi lại mã
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
