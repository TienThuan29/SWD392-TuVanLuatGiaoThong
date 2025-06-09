'use client';

import HeaderTop_C from '@/components/combination/HeaderTop_C'
import React, { useState } from 'react'
import { FaUser, FaCalendarAlt, FaQuestionCircle, FaHome, FaUsers, FaBook } from 'react-icons/fa'
import Link from 'next/link'
import { Color } from '@/configs/CssConstant'
import Profile from './Profile'
import PlanningPackage from './PlanningPackage'
import Helper from './Helper'
import { Role, User } from '@/models/User';
import { sampleUser } from '@/data/sample';

const Tabs = {
  profile: {
    id: 1,
    name: 'Thông tin cá nhân',
    icon: <FaUser className="h-4 w-4" style={{ color: Color.MainColor }} />,
    component: Profile
  },
  planning: {
    id: 2,
    name: 'Gói thành viên',
    icon: <FaCalendarAlt className="h-4 w-4" style={{ color: Color.MainColor }} />,
    component: PlanningPackage
  },
  help: {
    id: 3,
    name: 'Trợ giúp',
    icon: <FaQuestionCircle className="h-4 w-4" style={{ color: Color.MainColor }} />,
    component: Helper
  }
}

export default function Page() {

  const [logedUser, setLogedUser] = useState<User>(sampleUser);

  const [activeTab, setActiveTab] = useState<keyof typeof Tabs>(() => {
    return 'profile';
  });

  const renderContent = () => {
    const TabComponent = Tabs[activeTab].component;
    return <TabComponent />;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="sticky top-0 z-50 bg-white border-b border-gray-200/50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4">
          <HeaderTop_C />
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
              { logedUser?.role === Role.USER? "Tùy chọn" : "Quản lý" }
            </h3>

            {
              logedUser?.role === Role.USER ?
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
                  <span className="font-medium text-gray-900">Minh Đức</span>
                  <span className="text-xs text-gray-500">minhduc@example.com</span>
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

