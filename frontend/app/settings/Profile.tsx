"use client";

import { useState, useRef, useEffect } from "react";
import { User } from "@/models/User";
import { FiUser, FiMail, FiCalendar, FiImage, FiSave, FiX } from "react-icons/fi";
import { Input } from "@/components/modern-ui/input";
import { Button } from "@/components/modern-ui/button";
import { Color } from "@/configs/CssConstant";
import { useUserCrud } from "@/hooks/useUserCrud";

type Props = {
  logedUser: User;
};

export default function Profile({ logedUser }: Props) {
  const [user, setUser] = useState<User>(logedUser);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { updateUserInfo, loading } = useUserCrud();

  // Convert backend date format to HTML date input format
  const convertBackendDateToInputFormat = (backendDate: string | undefined): string => {
    if (!backendDate) return '';
    
    try {
      const date = new Date(backendDate);
      if (isNaN(date.getTime())) return '';
      
      // Format as yyyy-MM-dd for HTML date input
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    } catch (error) {
      console.error('Error converting date:', error);
      return '';
    }
  };

  // Convert HTML date input format to backend format
  const convertInputDateToBackendFormat = (inputDate: string): string => {
    if (!inputDate) return '';
    
    try {
      const date = new Date(inputDate);
      if (isNaN(date.getTime())) return '';
      
      // Return ISO string format that backend expects
      return date.toISOString();
    } catch (error) {
      console.error('Error converting date:', error);
      return '';
    }
  };

  // Format date for display (read-only fields)
  const formatDateForDisplay = (dateString: string | undefined): string => {
    // console.log("date string: ", dateString)
    if (!dateString) return '';
    
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return '';
      
      // Format as yyyy-MM-dd for display
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    } catch (error) {
      console.error('Error formatting date for display:', error);
      return '';
    }
  };

  // Initialize user with converted date format
  useEffect(() => {
    if (logedUser.birthDay) {
      const convertedDate = convertBackendDateToInputFormat(logedUser.birthDay);
      setUser(prev => ({
        ...prev,
        birthDay: convertedDate
      }));
    }
  }, [logedUser.birthDay]);

  // Format dates when user data changes
  useEffect(() => {
    setUser(prev => ({
      ...prev,
      birthDay: formatDateForDisplay(logedUser.birthDay),
      createdDate: formatDateForDisplay(logedUser.createdDate),
      updatedDate: formatDateForDisplay(logedUser.updatedDate)
    }));
  }, [logedUser.createdDate, logedUser.updatedDate]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      
      // Create preview URL
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        setPreviewUrl(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const clearSelectedFile = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const updateData: {
        fullname?: string;
        birthDay?: string;
        avatarFile?: File;
        avatarUrl?: string;
      } = {};

      // Always include fullname if it exists (not null/undefined)
      if (user.fullname) {
        updateData.fullname = user.fullname;
      }
      
      // Always include birthDay if it exists (not null/undefined)
      if (user.birthDay) {
        updateData.birthDay = convertInputDateToBackendFormat(user.birthDay);
      }

      // Handle avatar: upload new file or keep existing URL
      if (selectedFile) {
        updateData.avatarFile = selectedFile;
      } else if (user.avatarUrl) {
        // If no new file is selected, include the existing avatar URL to preserve it
        updateData.avatarUrl = user.avatarUrl;
      }

      // Only proceed if there are changes
      if (Object.keys(updateData).length === 0) {
        console.log("No changes detected");
        return;
      }

      console.log("Original user data:", logedUser);
      console.log("Current user data:", user);
      console.log("Updating user info:", updateData);
      
      if (!user.id) {
        console.error("User ID is required for update");
        return;
      }
      
      const updatedUser = await updateUserInfo(user.id, updateData);
      
      if (updatedUser) {
        // Format dates in the updated user data
        console.log("Raw updated user birthDay:", updatedUser.birthDay);
        
        // Ensure birthDay is properly formatted for the input field
        let formattedBirthDay = '';
        if (updatedUser.birthDay) {
          try {
            const date = new Date(updatedUser.birthDay);
            if (!isNaN(date.getTime())) {
              const year = date.getFullYear();
              const month = String(date.getMonth() + 1).padStart(2, '0');
              const day = String(date.getDate()).padStart(2, '0');
              formattedBirthDay = `${year}-${month}-${day}`;
            }
          } catch (error) {
            console.error('Error formatting birthDay after update:', error);
          }
        }
        
        const formattedUpdatedUser = {
          ...updatedUser,
          birthDay: formatDateForDisplay(updatedUser.birthDay),
          createdDate: formatDateForDisplay(updatedUser.createdDate),
          updatedDate: formatDateForDisplay(updatedUser.updatedDate)
        };
        
        // console.log("Formatted birthDay:", formattedUpdatedUser.birthDay);
        
        // Update local state with new user data
        setUser(formattedUpdatedUser);
        setSelectedFile(null);
        setPreviewUrl(null);
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
        // console.log("User updated successfully:", formattedUpdatedUser);
      }
    } catch (error) {
      console.error("Failed to update user:", error);
    }
  };

  // Determine which image to show
  const displayImage = previewUrl || user.avatarUrl;

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Profile Settings</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex items-center space-x-4">
          <div className="relative w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
            {displayImage ? (
              <img
                src={displayImage}
                alt="Profile"
                className="w-full h-full rounded-full object-cover"
              />
            ) : (
              <FiUser className="w-12 h-12 text-gray-400" />
            )}
            
            {/* Clear button for preview */}
            {previewUrl && (
              <button
                type="button"
                onClick={clearSelectedFile}
                className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
                title="Remove selected image"
              >
                <FiX className="w-3 h-3" />
              </button>
            )}
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Ảnh đại diện
            </label>
            <Input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="block w-full text-gray-500 text-center
                                file:mr-4 file:py-1 file:px-6
                                file:rounded-full file:border-0
                                file:text-sm file:font-semibold
                                file:bg-blue-50 file:text-blue-700
                                hover:file:bg-blue-100"
            />
            {selectedFile && (
              <p className="text-xs text-gray-500 mt-1">
                File đã chọn: {selectedFile.name}
              </p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tên đăng nhập
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiUser className="h-5 w-5 text-gray-400" />
              </div>
              <Input
                disabled={true}
                type="text"
                name="username"
                value={user.username}
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
                disabled={true}
                type="email"
                name="email"
                value={user.email}
                className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Họ tên
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
              Ngày sinh
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

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Ngày tạo tài khoản
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiCalendar className="h-5 w-5 text-gray-400" />
              </div>
              <Input
                disabled={true}
                type="date"
                name="createdDate"
                value={user.createdDate}
                className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-gray-50"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Ngày cập nhật gần nhất
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiCalendar className="h-5 w-5 text-gray-400" />
              </div>
              <Input
                disabled={true}
                type="date"
                name="updatedDate"
                value={user.updatedDate}
                className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-gray-50"
              />
            </div>
          </div>

        </div>

        <div className="flex justify-end">
          <Button
            size="lg"
            type="submit"
            disabled={loading}
            style={{ backgroundColor: Color.MainColor }}
          >
            <FiSave className="mr-2 h-5 w-5" />
            {loading ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </form>
    </div>
  );
}
