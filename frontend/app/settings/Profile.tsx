'use client';

import { useState } from 'react';
import { User } from '@/models/User';
import { FiUser, FiMail, FiCalendar, FiImage, FiSave } from 'react-icons/fi';
import { Input } from '@/components/modern-ui/input';
import { Button } from '@/components/modern-ui/button';
import { Color } from '@/configs/CssConstant';

type Props = {
    logedUser: User;
}

export default function Profile({ logedUser }: Props) {
    const [user, setUser] = useState<User>(logedUser);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUser(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        // TODO: Implement update user logic
        console.log('Updated user:', user);
    };

    return (
        <div className="max-w-2xl mx-auto p-6">
            <h1 className="text-2xl font-bold mb-6">Profile Settings</h1>
            
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="flex items-center space-x-4">
                    <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center">
                        {user.avatarUrl ? (
                            <img 
                                src={user.avatarUrl} 
                                alt="Profile" 
                                className="w-full h-full rounded-full object-cover"
                            />
                        ) : (
                            <FiUser className="w-12 h-12 text-gray-400" />
                        )}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Profile Picture
                        </label>
                        <Input
                            type="file"
                            accept="image/*"
                            className="block w-full text-gray-500 text-center
                                file:mr-4 file:py-1 file:px-6
                                file:rounded-full file:border-0
                                file:text-sm file:font-semibold
                                file:bg-blue-50 file:text-blue-700x
                                hover:file:bg-blue-100"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Username
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <FiUser className="h-5 w-5 text-gray-400" />
                            </div>
                            <Input
                                type="text"
                                name="username"
                                value={user.username}
                                onChange={handleInputChange}
                                className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Email
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <FiMail className="h-5 w-5 text-gray-400" />
                            </div>
                            <Input
                                type="email"
                                name="email"
                                value={user.email}
                                onChange={handleInputChange}
                                className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Full Name
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <FiUser className="h-5 w-5 text-gray-400" />
                            </div>
                            <Input
                                type="text"
                                name="fullname"
                                value={user.fullname}
                                onChange={handleInputChange}
                                className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Birth Day
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <FiCalendar className="h-5 w-5 text-gray-400" />
                            </div>
                            <Input
                                type="date"
                                name="birthDay"
                                value={user.birthDay}
                                onChange={handleInputChange}
                                className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            />
                        </div>
                    </div>
                </div>

                <div className="flex justify-end">
                    <Button
                        size="lg" 
                        type="submit"
                        style={{ backgroundColor: Color.MainColor }}
                    >
                        <FiSave className="mr-2 h-5 w-5" />
                        Save Changes
                    </Button>
                </div>
            </form>
        </div>
    );
}
