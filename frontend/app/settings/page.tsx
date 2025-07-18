'use client';

import HeaderTop_C from '@/components/combination/HeaderTop_C'
import React, { useState } from 'react'
import { FaUser, FaCalendarAlt, FaQuestionCircle, FaHome, FaUsers, FaBook, FaLock } from 'react-icons/fa'
import Link from 'next/link'
import { Color } from '@/configs/CssConstant'
import Profile from './Profile'
import PlanningPackage from './PlanningPackage'
import Helper from './Helper'
import PasswordChanging from './PasswordChanging'
import { useAuth } from '@/context/AuthContext';
import { useRoleValidator } from '@/hooks/useRoleValidator';

const Tabs = {
  profile: {
    id: 1,
    name: 'Thông tin cá nhân',
    icon: <FaUser className="h-4 w-4" style={{ color: Color.MainColor }} />,
    component: Profile
  },
  password: {
    id: 2,
    name: 'Đổi mật khẩu',
    icon: <FaLock className="h-4 w-4" style={{ color: Color.MainColor }} />,
    component: PasswordChanging
  },
  planning: {
    id: 3,
    name: 'Gói thành viên',
    icon: <FaCalendarAlt className="h-4 w-4" style={{ color: Color.MainColor }} />,
    component: PlanningPackage
  },
  help: {
    id: 4,
    name: 'Trợ giúp',
    icon: <FaQuestionCircle className="h-4 w-4" style={{ color: Color.MainColor }} />,
    component: Helper
  }
}

export default function Page() {

  const { user } = useAuth();
  const { isAdmin, isUser } = useRoleValidator(user);

  const [activeTab, setActiveTab] = useState<keyof typeof Tabs>(() => {
    return 'profile';
  });

  const renderContent = () => {
    const TabComponent = Tabs[activeTab].component;
    if (!user) {
      return (
        <div className="flex items-center justify-center h-full min-h-[400px]">
          <div className="flex flex-col items-center space-y-4">
            {/* Animated spinner */}
            <div className="relative">
              <div className="w-12 h-12 border-4 border-gray-200 rounded-full animate-spin border-t-blue-500"></div>
              <div className="absolute inset-0 w-12 h-12 border-4 border-transparent rounded-full animate-ping border-t-blue-300 opacity-20"></div>
            </div>
            
            {/* Loading text with fade animation */}
            <div className="text-center">
              <h3 className="text-lg font-medium text-gray-700 animate-pulse">
                Đang tải...
              </h3>
              <p className="text-sm text-gray-500 mt-1 animate-pulse delay-100">
                Vui lòng chờ trong giây lát
              </p>
            </div>
            
            {/* Animated dots */}
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce delay-100"></div>
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce delay-200"></div>
            </div>
          </div>
        </div>
      );
    }
    return <TabComponent logedUser={user} />;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="sticky top-0 z-50 bg-white border-b border-gray-200/50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4">
          <HeaderTop_C logedUser={user} />
        </div>
      </div>

      {/* Main Content with Sidebar */}
      <div className="flex h-[calc(100vh-64px)]">
        {/* Sidebar */}
        <div className="w-64 border-r border-gray-200/50 bg-white/95 backdrop-blur-sm h-full">
          <div className="flex flex-col h-full">
            {/* Home Link */}
            <Link
              href="/"
              className="group flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 transition-all duration-300 rounded-lg mx-2 my-1 hover:shadow-md active:scale-95 border border-gray-200/50 hover:border-gray-300/50 backdrop-blur-sm"
            >
              <div className="flex items-center justify-center w-9 h-9 rounded-full bg-white/80 group-hover:bg-white transition-colors duration-300 shadow-sm group-hover:shadow-md border border-gray-200/50 group-hover:border-gray-300/50">
                <FaHome className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" style={{ color: Color.MainColor }} />
              </div>
              <div className="flex flex-col">
                <span className="font-medium group-hover:text-gray-900 transition-colors duration-300">Trang chủ</span>
                <span className="text-xs text-gray-400 group-hover:text-gray-500 transition-colors duration-300">Quay lại màn hình chính</span>
              </div>
            </Link>

            <hr className='my-6 border-0 h-px bg-gradient-to-r from-transparent via-gray-500/50 to-transparent' />

            <h3 className="text-center text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">
              { isUser ? "Tùy chọn" : "Quản lý" }
            </h3>

            {
              isUser ?
                <>
                  {/* Profile Section */}
                  <div className="px-4 py-2">
                    <button
                      onClick={() => setActiveTab('profile')}
                      className={`w-full group flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 transition-all duration-300 rounded-lg hover:shadow-md active:scale-95 border border-gray-200/50 hover:border-gray-300/50 ${activeTab === 'profile' ? 'bg-gray-50 shadow-md border-gray-300/50' : ''
                        }`}
                    >
                      <div className="flex items-center justify-center w-9 h-9 rounded-full bg-white/80 group-hover:bg-white transition-colors duration-300 shadow-sm group-hover:shadow-md border border-gray-200/50 group-hover:border-gray-300/50">
                        <FaUser className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" style={{ color: Color.MainColor }} />
                      </div>
                      <span className="font-medium group-hover:text-gray-900 transition-colors duration-300">Thông tin cá nhân</span>
                    </button>
                  </div>

                  {/* Password Section */}
                  <div className="px-4 py-2">
                    <button
                      onClick={() => setActiveTab('password')}
                      className={`w-full group flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 transition-all duration-300 rounded-lg hover:shadow-md active:scale-95 border border-gray-200/50 hover:border-gray-300/50 ${activeTab === 'password' ? 'bg-gray-50 shadow-md border-gray-300/50' : ''
                        }`}
                    >
                      <div className="flex items-center justify-center w-9 h-9 rounded-full bg-white/80 group-hover:bg-white transition-colors duration-300 shadow-sm group-hover:shadow-md border border-gray-200/50 group-hover:border-gray-300/50">
                        <FaLock className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" style={{ color: Color.MainColor }} />
                      </div>
                      <span className="font-medium group-hover:text-gray-900 transition-colors duration-300">Đổi mật khẩu</span>
                    </button>
                  </div>

                  {/* Planning Section */}
                  <div className="px-4 py-2">
                    <button
                      onClick={() => setActiveTab('planning')}
                      className={`w-full group flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 transition-all duration-300 rounded-lg hover:shadow-md active:scale-95 border border-gray-200/50 hover:border-gray-300/50 ${activeTab === 'planning' ? 'bg-gray-50 shadow-md border-gray-300/50' : ''
                        }`}
                    >
                      <div className="flex items-center justify-center w-9 h-9 rounded-full bg-white/80 group-hover:bg-white transition-colors duration-300 shadow-sm group-hover:shadow-md border border-gray-200/50 group-hover:border-gray-300/50">
                        <FaCalendarAlt className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" style={{ color: Color.MainColor }} />
                      </div>
                      <span className="font-medium group-hover:text-gray-900 transition-colors duration-300">Gói thành viên</span>
                    </button>
                  </div>

                  {/* Helper Section */}
                  <div className="px-4 py-2">
                    <button
                      onClick={() => setActiveTab('help')}
                      className={`w-full group flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 transition-all duration-300 rounded-lg hover:shadow-md active:scale-95 border border-gray-200/50 hover:border-gray-300/50 ${activeTab === 'help' ? 'bg-gray-50 shadow-md border-gray-300/50' : ''
                        }`}
                    >
                      <div className="flex items-center justify-center w-9 h-9 rounded-full bg-white/80 group-hover:bg-white transition-colors duration-300 shadow-sm group-hover:shadow-md border border-gray-200/50 group-hover:border-gray-300/50">
                        <FaQuestionCircle className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" style={{ color: Color.MainColor }} />
                      </div>
                      <span className="font-medium group-hover:text-gray-900 transition-colors duration-300">Trợ giúp</span>
                    </button>
                  </div>
                </>
                : null
            }

            {/* User Profile Section at bottom */}
            <div className="mt-auto border-t border-gray-200/50 p-4 bg-gray-50/50">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-white shadow-sm border border-gray-200/50">
                  <FaUser className="h-5 w-5" style={{ color: Color.MainColor }} />
                </div>
                <div className="flex flex-col">
                  <span className="font-medium text-gray-900">{user?.fullname}</span>
                  <span className="text-xs text-gray-500">{user?.email}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 p-6 overflow-y-auto">
          {renderContent()}
        </div>
      </div>
    </div>
  )
}

