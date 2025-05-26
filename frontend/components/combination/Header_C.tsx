'use client';
import { useState } from "react";
import { HiChevronDown } from "react-icons/hi";
import { Color } from "@/configs/CssConstant";
import HeaderTop_C from "./HeaderTop_C";
import { User } from "@/models/User";

type Header_CProps = {
  logedUser?: User;
}

export default function Header_C({ logedUser } : Header_CProps) {

  const [productsOpen, setProductsOpen] = useState(false);
  const [practiceTypesOpen, setPracticeTypesOpen] = useState(false);
  const [resourcesOpen, setResourcesOpen] = useState(false);

  const mainColorStyle = { "--main-color": Color.MainColor } as React.CSSProperties;

  return (
    <header className="w-full border-b border-gray-200 bg-white" style={mainColorStyle}>

      <HeaderTop_C logedUser={logedUser} />

      <div className="max-w-7xl mx-auto px-2">
        {/* <div className="border-b border-gray-200/50 shadow-sm">
          <HeaderTop/>
        </div> */}
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
            <a href="/chatbot/pricing" className="hover-maincolor transition">Nâng cấp Chatbot</a>

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
          <a href="/chatbot">
            <button
              className="rounded-full px-6 py-2 text-lg font-semibold transition text-white hover:bg-[#005bb5] cursor-pointer"
              style={{ backgroundColor: Color.MainColor }}
            >
              Trải nghiệm Chatbot miễn phí
            </button>
          </a>
        </div>
      </div>
    </header>
  );
}
