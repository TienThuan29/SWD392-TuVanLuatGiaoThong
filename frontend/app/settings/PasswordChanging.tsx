"use client";

import { useState } from "react";
import { User } from "@/models/User";
import { FiLock, FiEye, FiEyeOff, FiSave, FiUser, FiLogIn } from "react-icons/fi";
import { Input } from "@/components/modern-ui/input";
import { Button } from "@/components/modern-ui/button";
import { Color } from "@/configs/CssConstant";
import useAxios from "@/hooks/useAxios";
import { Api } from "@/configs/Api";
import HttpStatus from "@/configs/HttpStatus";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

type Props = {
  logedUser: User;
};

export default function PasswordChanging({ logedUser }: Props) {
  // console.log(logedUser);

  const router = useRouter();
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });
  const [showPasswords, setShowPasswords] = useState({
    username: false,
    oldPassword: false,
    newPassword: false,
    confirmNewPassword: false,
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{
    username?: string;
    oldPassword?: string;
    newPassword?: string;
    confirmNewPassword?: string;
  }>({});

  const api = useAxios();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const togglePasswordVisibility = (field: keyof typeof showPasswords) => {
    setShowPasswords((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const handleGoToLogin = () => {
    router.push('/login');
  };

  const validateForm = (): boolean => {
    const newErrors: typeof errors = {};

    // Validate username if user hasn't created one
    if (logedUser.notCreateUsernameAndPassword) {
      if (!formData.username.trim()) {
        newErrors.username = "Tên đăng nhập không được để trống";
      } else if (formData.username.length < 3) {
        newErrors.username = "Tên đăng nhập phải có ít nhất 3 ký tự";
      }
    }

    // Validate new password is not null/empty
    if (!formData.newPassword.trim()) {
      newErrors.newPassword = "Mật khẩu mới không được để trống";
    } else if (formData.newPassword.length < 6) {
      newErrors.newPassword = "Mật khẩu mới phải có ít nhất 6 ký tự";
    }

    // Validate confirm password matches
    if (formData.newPassword !== formData.confirmNewPassword) {
      newErrors.confirmNewPassword = "Mật khẩu xác nhận không khớp";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      if (logedUser.notCreateUsernameAndPassword) {
        // Call API to create username and password
        const requestBody = {
          newUsername: formData.username,
          newPassword: formData.newPassword,
        };

        console.log("Sending username and password creation request:", requestBody);

        const response = await api.put(
          `${Api.User.UPDATE_USERNAME_PASSWORD}${logedUser.id}`,
          requestBody
        );

        if (response.status === HttpStatus.OK) {
          if (response.data.status === 'success') {
            toast.success(response.data.message || "Tạo tên đăng nhập và mật khẩu thành công!");
            // Show login popup for users who just created username/password
            setShowLoginPopup(true);
          } else {
            toast.error(response.data.message || "Có lỗi xảy ra khi tạo tên đăng nhập và mật khẩu");
          }
        } else {
          toast.error("Có lỗi xảy ra khi tạo tên đăng nhập và mật khẩu");
        }
      } else {
        // Call API to change password only
        const requestBody = {
          oldPassword: formData.oldPassword || null,
          newPassword: formData.newPassword,
        };

        console.log("Sending password change request:", requestBody);

        const response = await api.put(
          `${Api.User.CHANGE_PASSWORD}${logedUser.id}`,
          requestBody
        );

        if (response.status === HttpStatus.OK) {
          if (response.data.status === 'success') {
            toast.success(response.data.message || "Đổi mật khẩu thành công!");
          } else {
            toast.error(response.data.message || "Có lỗi xảy ra khi đổi mật khẩu");
          }
        } else {
          toast.error("Có lỗi xảy ra khi đổi mật khẩu");
        }
      }

      // Reset form
      setFormData({
        username: "",
        oldPassword: "",
        newPassword: "",
        confirmNewPassword: "",
      });

      // Reset password visibility
      setShowPasswords({
        username: false,
        oldPassword: false,
        newPassword: false,
        confirmNewPassword: false,
      });

      // Clear errors
      setErrors({});
    } catch (err: any) {
      console.error("Password/Username change error:", err);

      // Handle specific error messages from backend
      if (err.response?.data?.message) {
        toast.error(err.response.data.message);
      } else {
        toast.error("Có lỗi xảy ra khi thực hiện thao tác");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="max-w-2xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-6">
          {logedUser.notCreateUsernameAndPassword ? "Tạo Tên Đăng Nhập và Mật Khẩu" : "Đổi Mật Khẩu"}
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 gap-6">
            {logedUser.notCreateUsernameAndPassword ? (
              <>
                {/* New username if user hasn't created one */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tên đăng nhập <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiUser className="h-5 w-5 text-gray-400" />
                    </div>
                    <Input
                      type="text"
                      name="username"
                      value={formData.username}
                      onChange={handleInputChange}
                      placeholder="Tên đăng nhập mới"
                      className={`pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${
                        errors.username ? "border-red-500 focus:border-red-500 focus:ring-red-500" : ""
                      }`}
                    />
                  </div>
                  {errors.username && (
                    <p className="mt-1 text-sm text-red-600">{errors.username}</p>
                  )}
                </div>

                {/* New Password */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Mật Khẩu Mới <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiLock className="h-5 w-5 text-gray-400" />
                    </div>
                    <Input
                      type={showPasswords.newPassword ? "text" : "password"}
                      name="newPassword"
                      value={formData.newPassword}
                      onChange={handleInputChange}
                      placeholder="Nhập mật khẩu mới"
                      className={`pl-10 pr-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${
                        errors.newPassword ? "border-red-500 focus:border-red-500 focus:ring-red-500" : ""
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => togglePasswordVisibility("newPassword")}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-600"
                    >
                      {showPasswords.newPassword ? (
                        <FiEyeOff className="h-5 w-5" />
                      ) : (
                        <FiEye className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                  {errors.newPassword && (
                    <p className="mt-1 text-sm text-red-600">{errors.newPassword}</p>
                  )}
                </div>

                {/* Confirm New Password */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Xác Nhận Mật Khẩu Mới <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiLock className="h-5 w-5 text-gray-400" />
                    </div>
                    <Input
                      type={showPasswords.confirmNewPassword ? "text" : "password"}
                      name="confirmNewPassword"
                      value={formData.confirmNewPassword}
                      onChange={handleInputChange}
                      placeholder="Nhập lại mật khẩu mới"
                      className={`pl-10 pr-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${
                        errors.confirmNewPassword ? "border-red-500 focus:border-red-500 focus:ring-red-500" : ""
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => togglePasswordVisibility("confirmNewPassword")}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-600"
                    >
                      {showPasswords.confirmNewPassword ? (
                        <FiEyeOff className="h-5 w-5" />
                      ) : (
                        <FiEye className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                  {errors.confirmNewPassword && (
                    <p className="mt-1 text-sm text-red-600">{errors.confirmNewPassword}</p>
                  )}
                </div>
              </>
            ) : (
              <>
                {/* Old Password */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Mật Khẩu Cũ (Tùy chọn)
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiLock className="h-5 w-5 text-gray-400" />
                    </div>
                    <Input
                      type={showPasswords.oldPassword ? "text" : "password"}
                      name="oldPassword"
                      value={formData.oldPassword}
                      onChange={handleInputChange}
                      placeholder="Nhập mật khẩu cũ"
                      className={`pl-10 pr-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${
                        errors.oldPassword ? "border-red-500 focus:border-red-500 focus:ring-red-500" : ""
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => togglePasswordVisibility("oldPassword")}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-600"
                    >
                      {showPasswords.oldPassword ? (
                        <FiEyeOff className="h-5 w-5" />
                      ) : (
                        <FiEye className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                  {errors.oldPassword && (
                    <p className="mt-1 text-sm text-red-600">{errors.oldPassword}</p>
                  )}
                </div>

                {/* New Password */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Mật Khẩu Mới <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiLock className="h-5 w-5 text-gray-400" />
                    </div>
                    <Input
                      type={showPasswords.newPassword ? "text" : "password"}
                      name="newPassword"
                      value={formData.newPassword}
                      onChange={handleInputChange}
                      placeholder="Nhập mật khẩu mới"
                      className={`pl-10 pr-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${
                        errors.newPassword ? "border-red-500 focus:border-red-500 focus:ring-red-500" : ""
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => togglePasswordVisibility("newPassword")}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-600"
                    >
                      {showPasswords.newPassword ? (
                        <FiEyeOff className="h-5 w-5" />
                      ) : (
                        <FiEye className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                  {errors.newPassword && (
                    <p className="mt-1 text-sm text-red-600">{errors.newPassword}</p>
                  )}
                </div>

                {/* Confirm New Password */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Xác Nhận Mật Khẩu Mới <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiLock className="h-5 w-5 text-gray-400" />
                    </div>
                    <Input
                      type={showPasswords.confirmNewPassword ? "text" : "password"}
                      name="confirmNewPassword"
                      value={formData.confirmNewPassword}
                      onChange={handleInputChange}
                      placeholder="Nhập lại mật khẩu mới"
                      className={`pl-10 pr-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${
                        errors.confirmNewPassword ? "border-red-500 focus:border-red-500 focus:ring-red-500" : ""
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => togglePasswordVisibility("confirmNewPassword")}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-600"
                    >
                      {showPasswords.confirmNewPassword ? (
                        <FiEyeOff className="h-5 w-5" />
                      ) : (
                        <FiEye className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                  {errors.confirmNewPassword && (
                    <p className="mt-1 text-sm text-red-600">{errors.confirmNewPassword}</p>
                  )}
                </div>
              </>
            )}
          </div>

          {/* Password Requirements */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="text-sm font-medium text-blue-800 mb-2">Yêu cầu:</h3>
            <ul className="text-sm text-blue-700 space-y-1">
              {logedUser.notCreateUsernameAndPassword && (
                <li>• Tên đăng nhập phải có ít nhất 3 ký tự</li>
              )}
              <li>• Mật khẩu mới phải có ít nhất 6 ký tự</li>
              <li>• Mật khẩu xác nhận phải khớp với mật khẩu mới</li>
            </ul>
          </div>

          <div className="flex justify-end">
            <Button
              size="lg"
              type="submit"
              disabled={loading}
              style={{ backgroundColor: Color.MainColor }}
            >
              <FiSave className="mr-2 h-5 w-5" />
              {loading 
                ? (logedUser.notCreateUsernameAndPassword ? "Đang tạo..." : "Đang lưu...") 
                : (logedUser.notCreateUsernameAndPassword ? "Tạo Tài Khoản" : "Lưu Thay Đổi")
              }
            </Button>
          </div>
        </form>
      </div>

      {/* Login Required Popup */}
      {showLoginPopup && (
        <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-sm bg-white/30 dark:bg-gray-900/20">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full mx-4 shadow-xl">
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 dark:bg-green-900 mb-4">
                <FiLogIn className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                Tạo tài khoản thành công!
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
                Tài khoản của bạn đã được tạo thành công. Vui lòng đăng nhập lại với tên đăng nhập và mật khẩu mới.
              </p>
              <div className="flex justify-center">
                <Button
                  onClick={handleGoToLogin}
                  className="bg-maincolor hover:bg-[#005bb5] text-white font-medium py-2 px-4 rounded-md transition-colors"
                  style={{ backgroundColor: Color.MainColor }}
                >
                  <FiLogIn className="mr-2 h-4 w-4" />
                  Đăng nhập ngay
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
