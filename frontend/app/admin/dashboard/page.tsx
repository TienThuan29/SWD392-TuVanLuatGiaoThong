'use client'

import HeaderTop_C from '@/components/combination/HeaderTop_C'
import React, { useState } from 'react'
import { FaUsers, FaBook, FaHome } from 'react-icons/fa'
import { BiSolidPackage } from "react-icons/bi";
import Link from 'next/link'
import { Color } from '@/configs/CssConstant'
import UserManagementSection from './UserManagementSection'
import LawManagementSection from './LawManagementSection'
import UsagePackageSection from './UsagePackageSection'
import { useAuth } from '@/context/AuthContext'

const Tabs = {
  users: {
    id: 1,
    name: 'Quản lý người dùng',
    icon: <FaUsers className="h-4 w-4" style={{ color: Color.MainColor }} />,
    component: UserManagementSection
  },
  laws: {
    id: 2,
    name: 'Quản lý dữ liệu luật',
    icon: <FaBook className="h-4 w-4" style={{ color: Color.MainColor }} />,
    component: LawManagementSection
  },
  packages: {
    id: 3,
    name: 'Quản lý gói sử dụng',
    icon: <BiSolidPackage className="h-4 w-4" style={{ color: Color.MainColor }} />,
    component: UsagePackageSection
  }
}

export default function Dashboard() {

  const { user, setUser } = useAuth();

  const [activeTab, setActiveTab] = useState<keyof typeof Tabs>(() => {
    return 'users';
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
          <HeaderTop_C logedUser={user}/>
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
              Quản lý
            </h3>

            {/* User Management Section */}
            <div className="px-4 py-2">
              <button
                onClick={() => setActiveTab('users')}
                className={`w-full group flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 transition-all duration-300 rounded-lg hover:shadow-md active:scale-95 border border-gray-200/50 hover:border-gray-300/50 ${activeTab === 'users' ? 'bg-gray-50 shadow-md border-gray-300/50' : ''}`}
              >
                <div className="flex items-center justify-center w-9 h-9 rounded-full bg-white/80 group-hover:bg-white transition-colors duration-300 shadow-sm group-hover:shadow-md border border-gray-200/50 group-hover:border-gray-300/50">
                  <FaUsers className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" style={{ color: Color.MainColor }} />
                </div>
                <span className="font-medium group-hover:text-gray-900 transition-colors duration-300">Quản lý người dùng</span>
              </button>
            </div>

            {/* Law Data Management Section */}
            <div className="px-4 py-2">
              <button
                onClick={() => setActiveTab('laws')}
                className={`w-full group flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 transition-all duration-300 rounded-lg hover:shadow-md active:scale-95 border border-gray-200/50 hover:border-gray-300/50 ${activeTab === 'laws' ? 'bg-gray-50 shadow-md border-gray-300/50' : ''}`}
              >
                <div className="flex items-center justify-center w-9 h-9 rounded-full bg-white/80 group-hover:bg-white transition-colors duration-300 shadow-sm group-hover:shadow-md border border-gray-200/50 group-hover:border-gray-300/50">
                  <FaBook className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" style={{ color: Color.MainColor }} />
                </div>
                <span className="font-medium group-hover:text-gray-900 transition-colors duration-300">Quản lý dữ liệu luật</span>
              </button>
            </div>

            {/* Usage Package Management Section */}
            <div className="px-4 py-2">
              <button
                onClick={() => setActiveTab('packages')}
                className={`w-full group flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 transition-all duration-300 rounded-lg hover:shadow-md active:scale-95 border border-gray-200/50 hover:border-gray-300/50 ${activeTab === 'packages' ? 'bg-gray-50 shadow-md border-gray-300/50' : ''}`}
              >
                <div className="flex items-center justify-center w-9 h-9 rounded-full bg-white/80 group-hover:bg-white transition-colors duration-300 shadow-sm group-hover:shadow-md border border-gray-200/50 group-hover:border-gray-300/50">
                  <BiSolidPackage className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" style={{ color: Color.MainColor }} />
                </div>
                <span className="font-medium group-hover:text-gray-900 transition-colors duration-300">Quản lý gói sử dụng</span>
              </button>
            </div>

            {/* User Profile Section at bottom */}
            <div className="mt-auto border-t border-gray-200/50 p-4 bg-gray-50/50">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-white shadow-sm border border-gray-200/50">
                  <FaUsers className="h-5 w-5" style={{ color: Color.MainColor }} />
                </div>
                <div className="flex flex-col">
                  <span className="font-medium text-gray-900">Admin</span>
                  <span className="text-xs text-gray-500">admin@example.com</span>
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