'use client';

import React from 'react';

export default function PlanningPackage() {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Gói thành viên</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Basic Package */}
        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
          <h2 className="text-xl font-semibold mb-4">Gói Cơ Bản</h2>
          <p className="text-gray-600 mb-4">Phù hợp cho người mới bắt đầu</p>
          <ul className="space-y-2 mb-6">
            <li className="flex items-center">
              <span className="text-green-500 mr-2">✓</span>
              Tư vấn cơ bản
            </li>
            <li className="flex items-center">
              <span className="text-green-500 mr-2">✓</span>
              Hỗ trợ qua email
            </li>
          </ul>
          <button className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors">
            Chọn gói
          </button>
        </div>

        {/* Premium Package */}
        <div className="bg-white rounded-lg shadow-md p-6 border-2 border-blue-500 transform scale-105">
          <div className="bg-blue-500 text-white text-sm font-semibold px-3 py-1 rounded-full inline-block mb-4">
            Phổ biến
          </div>
          <h2 className="text-xl font-semibold mb-4">Gói Premium</h2>
          <p className="text-gray-600 mb-4">Dành cho người dùng chuyên nghiệp</p>
          <ul className="space-y-2 mb-6">
            <li className="flex items-center">
              <span className="text-green-500 mr-2">✓</span>
              Tư vấn 24/7
            </li>
            <li className="flex items-center">
              <span className="text-green-500 mr-2">✓</span>
              Hỗ trợ qua điện thoại
            </li>
            <li className="flex items-center">
              <span className="text-green-500 mr-2">✓</span>
              Ưu tiên xử lý
            </li>
          </ul>
          <button className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors">
            Chọn gói
          </button>
        </div>

        {/* Enterprise Package */}
        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
          <h2 className="text-xl font-semibold mb-4">Gói Doanh Nghiệp</h2>
          <p className="text-gray-600 mb-4">Giải pháp toàn diện cho doanh nghiệp</p>
          <ul className="space-y-2 mb-6">
            <li className="flex items-center">
              <span className="text-green-500 mr-2">✓</span>
              Tư vấn chuyên sâu
            </li>
            <li className="flex items-center">
              <span className="text-green-500 mr-2">✓</span>
              Hỗ trợ 24/7
            </li>
            <li className="flex items-center">
              <span className="text-green-500 mr-2">✓</span>
              Quản lý nhiều tài khoản
            </li>
          </ul>
          <button className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors">
            Chọn gói
          </button>
        </div>
      </div>
    </div>
  );
}
