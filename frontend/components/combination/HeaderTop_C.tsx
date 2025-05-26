'use client';
import { HiCheck, HiChevronDown } from "react-icons/hi";
import { FiGlobe, FiUser, FiSettings, FiLogOut } from "react-icons/fi";
import { Color } from "@/configs/CssConstant";
import Constant from "@/configs/Constant";
import { User } from "@/models/User";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/modern-ui/avatar";
import { useState, useRef, useEffect } from "react";

type HeaderTop_CProps = {
    logedUser?: User;
}

export default function HeaderTop_C({ logedUser } : HeaderTop_CProps) {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsDropdownOpen(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="sticky top-0 z-50 bg-white border-b border-gray-200/50 shadow-sm">
            <div className="max-w-7xl mx-auto px-4">
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

                        {/* User section */}
                        {logedUser ? (
                            <div className="relative" ref={dropdownRef}>
                                <button 
                                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                    className="flex items-center space-x-2 hover:bg-gray-50 p-2 rounded-lg transition-colors duration-200"
                                >
                                    <Avatar className="h-8 w-8">
                                        <AvatarImage src={logedUser.avatarUrl || "https://raw.githubusercontent.com/thangdevalone/modern-ui/refs/heads/main/public/assets/logo.png"} alt="User avatar" />
                                        <AvatarFallback>{logedUser.fullname?.charAt(0) || 'U'}</AvatarFallback>
                                    </Avatar>
                                    <span className="font-medium">{logedUser.fullname}</span>
                                    <HiChevronDown className={`h-5 w-5 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                                </button>

                                {/* Dropdown Menu */}
                                {isDropdownOpen && (
                                    <div className="absolute right-0 mt-2 w-48 rounded-lg bg-white shadow-lg border border-gray-200/50 py-1 z-50">
                                        <a 
                                            href="/settings" 
                                            className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                                        >
                                            <FiSettings className="h-5 w-5" />
                                            <span>Cài đặt</span>
                                        </a>
                                        <hr className="my-1 border-t border-gray-100" />
                                        <button 
                                            onClick={() => {
                                                // Add logout logic here
                                                console.log('Logout clicked');
                                            }}
                                            className="w-full flex items-center space-x-2 px-4 py-2 text-red-700 hover:bg-gray-50 transition-colors duration-200"
                                        >
                                            <FiLogOut className="h-5 w-5" />
                                            <span>Đăng xuất</span>
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <button className="flex items-center space-x-1 hover-maincolor transition">
                                <FiUser size={20} />
                                <a href={Constant.Page.LoginPage}>Đăng nhập/Đăng ký</a>
                            </button>
                        )}
                    </nav>
                </div>
            </div>
        </div>
    )
}
