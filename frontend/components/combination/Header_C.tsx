'use client';
import { useState } from "react";
import { HiCheck, HiChevronDown } from "react-icons/hi";
import { FiGlobe, FiUser } from "react-icons/fi";
import { Color } from "@/configs/CssConstant";

export default function Header_C() {
  const [productsOpen, setProductsOpen] = useState(false);
  const [practiceTypesOpen, setPracticeTypesOpen] = useState(false);
  const [resourcesOpen, setResourcesOpen] = useState(false);

  // Inline style to inject CSS variable --main-color dynamically
  const mainColorStyle = { "--main-color": Color.MainColor } as React.CSSProperties;

  return (
    <header className="w-full border-b border-gray-200 bg-white" style={mainColorStyle}>
      <div className="max-w-7xl mx-auto px-6">
        {/* Top bar */}
        <div className="flex justify-between items-center py-2 text-sm font-normal text-gray-800">
          {/* Left: Logo */}
          <div className="flex items-center space-x-3">
            {/* Icon */}
            <div className="w-8 h-8 flex items-center justify-center rounded-full border-2 border-blue-600 text-blue-600">
              <HiCheck size={20} />
            </div>
            <span
              className="text-2xl font-semibold select-none cursor-default"
              style={{ color: Color.MainColor }}
            >
              Tư Vấn Luật Giao Thông Việt Nam
            </span>
          </div>

          {/* Right top menu */}
          <nav className="flex items-center space-x-6 text-sm">
            <a href="#" className="hover-maincolor transition">Giới thiệu</a>
            <a href="#" className="hover-maincolor transition">Cộng đồng</a>

            {/* Region with globe icon */}
            <button className="flex items-center space-x-1 hover-maincolor transition">
              <FiGlobe size={20} />
              <span>Ngôn ngữ</span>
            </button>

            {/* Login with user icon */}
            <button className="flex items-center space-x-1 hover-maincolor transition">
              <FiUser size={20} />
              <span>Đăng nhập/Đăng ký</span>
            </button>
          </nav>
        </div>

        {/* Bottom nav bar */}
        <div className="flex items-center justify-between py-4">
          {/* Left nav links */}
          <nav className="flex items-center space-x-8 font-semibold text-gray-900 text-lg">
            {/* Products dropdown */}
            <div
              className="relative cursor-pointer"
              onMouseEnter={() => setProductsOpen(true)}
              onMouseLeave={() => setProductsOpen(false)}
            >
              <button className="flex items-center space-x-1 hover-maincolor transition">
                <span>Sản phẩm</span>
                <HiChevronDown size={16} />
              </button>
              {productsOpen && (
                <div className="absolute top-full mt-1 left-0 bg-white border border-gray-200 rounded shadow-lg p-4 min-w-[200px] z-50">
                  <ul>
                    <li className="py-1 hover-maincolor cursor-pointer">Sản phẩm 1</li>
                    <li className="py-1 hover-maincolor cursor-pointer">Sản phẩm 2</li>
                    <li className="py-1 hover-maincolor cursor-pointer">Sản phẩm 3</li>
                  </ul>
                </div>
              )}
            </div>

            {/* Practice Types dropdown */}
            <div
              className="relative cursor-pointer"
              onMouseEnter={() => setPracticeTypesOpen(true)}
              onMouseLeave={() => setPracticeTypesOpen(false)}
            >
              <button className="flex items-center space-x-1 hover-maincolor transition">
                <span>Practice Types</span>
                <HiChevronDown size={16} />
              </button>
              {practiceTypesOpen && (
                <div className="absolute top-full mt-1 left-0 bg-white border border-gray-200 rounded shadow-lg p-4 min-w-[200px] z-50">
                  <ul>
                    <li className="py-1 hover-maincolor cursor-pointer"></li>
                    <li className="py-1 hover-maincolor cursor-pointer"></li>
                    <li className="py-1 hover-maincolor cursor-pointer"></li>
                  </ul>
                </div>
              )}
            </div>

            {/* Pricing */}
            <a href="#" className="hover-maincolor transition">Nâng cấp Chatbot</a>

            {/* Resources & Events dropdown */}
            <div
              className="relative cursor-pointer"
              onMouseEnter={() => setResourcesOpen(true)}
              onMouseLeave={() => setResourcesOpen(false)}
            >
              <button className="flex items-center space-x-1 hover-maincolor transition">
                <span>Tài liệu luật giao thông</span>
                <HiChevronDown size={16} />
              </button>
              {resourcesOpen && (
                <div className="absolute top-full mt-1 left-0 bg-white border border-gray-200 rounded shadow-lg p-4 min-w-[220px] z-50">
                  <ul>
                    <li className="py-1 hover-maincolor cursor-pointer">Tài liệu 1</li>
                    {/* <li className="py-1 hover-maincolor cursor-pointer">Event 1</li> */}
                  </ul>
                </div>
              )}
            </div>
          </nav>

          {/* Call to action button */}
          <button
            className="rounded-full px-6 py-2 text-lg font-semibold transition text-white hover:bg-[#005bb5] cursor-pointer"
            style={{ backgroundColor: Color.MainColor }}
          >
            Trải nghiệm Chatbot miễn phí
          </button>
        </div>
      </div>
    </header>
  );
}
