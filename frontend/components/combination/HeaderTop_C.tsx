'use client';
import { HiCheck, HiChevronDown } from "react-icons/hi";
import { FiGlobe, FiUser, FiSettings, FiLogOut } from "react-icons/fi";
import { Color } from "@/configs/CssConstant";
import Constant from "@/configs/Constant";
import { Role, User } from "@/models/User";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/modern-ui/avatar";
import { useState, useRef, useEffect } from "react";
import { FaUsers } from "react-icons/fa6";
import { IoNewspaper } from "react-icons/io5";
import { useRoleValidator } from "@/hooks/useRoleValidator";
import { useAuth } from "@/context/AuthContext";
import { ThemeToggle_C } from "@/components/ui/ThemeToggle_C";

type HeaderTop_CProps = {
    logedUser?: User | null;
}

export default function HeaderTop_C({ logedUser }: HeaderTop_CProps) {
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

    const { logout } = useAuth();
    const { isAdmin, isUser } = useRoleValidator(logedUser);

    return (
        <div className="sticky top-0 z-50 bg-white dark:bg-gray-800 border-b border-gray-200/50 dark:border-gray-700/50 shadow-sm transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4">
                {/* Top bar */}
                <div className="flex justify-between items-center py-2 text-sm font-normal text-gray-800 dark:text-gray-200">
                    {/* Left: Logo */}
                    <div className="flex items-center space-x-3">
                        {/* Icon */}
                        <div className="w-8 h-8 flex items-center justify-center rounded-full border-2 border-blue-600 dark:border-blue-400 text-blue-600 dark:text-blue-400">
                            <HiCheck size={20} />
                        </div>
                        <span
                            className="text-2xl font-semibold select-none cursor-pointer transition-colors duration-300"
                            style={{ color: Color.MainColor }}
                            onClick={() => window.location.href = '/'}
                        >
                            Tư Vấn Luật Giao Thông Việt Nam
                        </span>
                    </div>

                    {/* Right top menu */}
                    <nav className="flex items-center space-x-6 text-sm">
                        <a href="#" className="hover-maincolor transition">Giới thiệu</a>
                        <a href="#" className="hover-maincolor transition">Cộng đồng</a>

                        {/* Theme Toggle */}
                        <ThemeToggle_C />

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
                                    className="flex items-center space-x-2 hover:bg-gray-50 dark:hover:bg-gray-700 p-2 rounded-lg transition-colors duration-200"
                                >
                                    <Avatar className="h-8 w-8">
                                        <AvatarImage src={logedUser.avatarUrl || "https://raw.githubusercontent.com/thangdevalone/modern-ui/refs/heads/main/public/assets/logo.png"} alt="User avatar" />
                                        <AvatarFallback className="bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300">{logedUser.fullname?.charAt(0) || 'U'}</AvatarFallback>
                                    </Avatar>
                                    <span className="font-medium">{logedUser.fullname}</span>
                                    <HiChevronDown className={`h-5 w-5 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                                </button>

                                {/* Dropdown Menu */}
                                {isDropdownOpen && (
                                    <div className="absolute right-0 mt-2 w-48 rounded-lg bg-white dark:bg-gray-800 shadow-lg border border-gray-200/50 dark:border-gray-600/50 py-1 z-50 transition-colors duration-300">
                                        {isUser && (
                                            <a
                                                href="/settings"
                                                className="flex items-center space-x-2 px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
                                            >
                                                <FiSettings className="h-5 w-5" />
                                                <span>Cài đặt</span>
                                            </a>
                                        )}
                                        
                                        {isAdmin && (
                                            <a
                                                href="/admin/dashboard"
                                                className="flex items-center space-x-2 px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
                                            >
                                                <FaUsers className="h-5 w-5" />
                                                <span>Quản lý trang web</span>
                                            </a>
                                        )}

                                        <hr className="my-1 border-t border-gray-100 dark:border-gray-600" />
                                        <button
                                            onClick={() => {
                                                logout()
                                            }}
                                            className="w-full flex items-center space-x-2 px-4 py-2 text-red-700 dark:text-red-400 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200 cursor-pointer"
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
