'use client';

import { User } from '@/models/User';
import React, { useState } from 'react';
import useUserPackage from '@/hooks/useUserPackage';
import { FiInfo } from 'react-icons/fi';

type Props = {
    logedUser: User;
}

export default function PlanningPackage({ logedUser }: Props) {

    const [user] = useState<User>(logedUser);
    const { currentPackage, loading, error } = useUserPackage();

    return (
        <div className="max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold mb-6">Gói thành viên</h1>
            
            {loading && (
                <div className="text-center py-4">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                    <p className="mt-2 text-gray-600">Đang tải thông tin gói...</p>
                </div>
            )}

            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                    <p>Lỗi: {error}</p>
                </div>
            )}

            {currentPackage && !loading && (
                <div className="bg-white shadow-lg rounded-lg p-6">
                    <h2 className="text-xl font-semibold mb-4">Gói hiện tại</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <p className="text-gray-600">Tên gói:</p>
                            <p className="font-medium">{currentPackage.name}</p>
                        </div>
                        <div>
                            <p className="text-gray-600">Giá:</p>
                            <p className="font-medium">{currentPackage.price?.toLocaleString('vi-VN')} VNĐ</p>
                        </div>
                        <div>
                            <p className="text-gray-600">Giới hạn hàng ngày:</p>
                            <p className="font-medium">{currentPackage.dailyLimit} lần</p>
                        </div>
                        <div>
                            <p className="text-gray-600">Số ngày:</p>
                            <p className="font-medium">{currentPackage.daysLimit} ngày</p>
                        </div>
                    </div>
                    {currentPackage.description && (
                        <div className="mt-4">
                            <p className="text-gray-600 mb-2">Mô tả:</p>
                            <div className="space-y-2">
                                {currentPackage.description
                                    .split(/[.!?]+/)
                                    .filter(sentence => sentence.trim().length > 0)
                                    .map((sentence, index) => (
                                        <div key={index} className="flex items-start space-x-2">
                                            <FiInfo className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                                            <p className="text-sm text-gray-700">{sentence.trim()}</p>
                                        </div>
                                    ))}
                            </div>
                        </div>
                    )}
                </div>
            )}

            {!currentPackage && !loading && !error && (
                <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded">
                    <p>Bạn chưa có gói sử dụng nào.</p>
                </div>
            )}
        </div>
    );
}
