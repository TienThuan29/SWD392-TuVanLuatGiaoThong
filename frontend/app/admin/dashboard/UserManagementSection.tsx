'use client';

import React, { useState, useEffect } from 'react';
import { User } from '@/models/User';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
import { Input } from '@/components/modern-ui/input';
import { useUserCrud } from '@/hooks/useUserCrud';
import Spinner_C from '@/components/combination/Spinner_C';
import { toast } from 'sonner';

export default function UserManagementSection() {

  const {
    users,
    loading,
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
  } = useUserCrud();

  // const [users, setUsers] = useState<User[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [formLoading, setFormLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<User>>({
    username: '',
    email: '',
    fullname: '',
    avatarUrl: '',
    birthDay: '',
    isEnable: true,
  });

  useEffect(() => {
    getAllUsers();
  }, [getAllUsers]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormLoading(true);
    
    try {
      if (editingUser) {
        // Update existing user
        await updateUser(editingUser.username!, formData);
        toast.success('Cập nhật người dùng thành công');
      } else {
        // Add new user
        await createUser(formData as User);
        toast.success('Thêm người dùng thành công');
      }
      
      // Refresh the user list
      await getAllUsers();
      
      // Close modal and reset form
      setIsModalOpen(false);
      setEditingUser(null);
      setFormData({
        username: '',
        email: '',
        fullname: '',
        avatarUrl: '',
        birthDay: '',
        isEnable: true,
      });
    } catch (error) {
      console.error('Error saving user:', error);
      toast.error('Có lỗi xảy ra khi lưu người dùng');
    } finally {
      setFormLoading(false);
    }
  };

  const handleEdit = (user: User) => {
    setEditingUser(user);
    setFormData(user);
    setIsModalOpen(true);
  };

  const handleDelete = async (username: string) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa người dùng này?')) {
      setDeleteLoading(username);
      try {
        await deleteUser(username);
        toast.success('Xóa người dùng thành công');
        await getAllUsers(); // Refresh the list
      } catch (error) {
        console.error('Error deleting user:', error);
        toast.error('Có lỗi xảy ra khi xóa người dùng');
      } finally {
        setDeleteLoading(null);
      }
    }
  };

  function toDateInputValue(dateString?: string) {
    if (!dateString || dateString === 'null') return '';
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return '';
    return date.toISOString().slice(0, 10);
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">Quản lý người dùng</h2>
        <button
          onClick={() => {
            setEditingUser(null);
            setFormData({
              username: '',
              email: '',
              fullname: '',
              avatarUrl: '',
              birthDay: '',
              isEnable: true,
            });
            setIsModalOpen(true);
          }}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <FaPlus /> Thêm người dùng
        </button>
      </div>

      {/* User Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="text-center">
              <Spinner_C size="lg" color="blue-600" />
              <p className="mt-6  text-gray-600">Đang tải dữ liệu...</p>
            </div>
          </div>
        ) : (
          <>
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tên đăng nhập</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Họ tên</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ngày sinh</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Trạng thái</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Thao tác</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {users.map((user) => (
                  <tr key={user.username} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">{user.username}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{user.fullname}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{(user.birthDay == null || user.birthDay == 'null')? '(Chưa cập nhật)' : user.birthDay}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${user.isEnable ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                        {user.isEnable ? 'Hoạt động' : 'Khóa'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => handleEdit(user)}
                        className="text-blue-600 hover:text-blue-900 mr-4"
                        disabled={deleteLoading === user.username}
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => handleDelete(user.username!)}
                        className="text-red-600 hover:text-red-900 disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={deleteLoading === user.username}
                      >
                        {deleteLoading === user.username ? (
                          <Spinner_C size="sm" color="red-600" />
                        ) : (
                          <FaTrash />
                        )}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {users.length === 0 && !loading && (
              <div className="text-center py-8 text-gray-500">
                Không có dữ liệu người dùng
              </div>
            )}
          </>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 backdrop-blur-sm bg-white/30 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-xl">
            <h3 className="text-lg font-semibold mb-4">
              {editingUser ? 'Chỉnh sửa người dùng' : 'Thêm người dùng mới'}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Tên đăng nhập</label>
                <Input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <Input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Họ tên</label>
                <Input
                  type="text"
                  name="fullname"
                  value={formData.fullname}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Ngày sinh</label>
                <Input
                  type="date"
                  name="birthDay"
                  value={formData.birthDay}
                  onChange={handleInputChange}
                  required
                />
              </div>
              {
                editingUser ?
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Ngày tạo</label>
                      <Input
                        type="date"
                        name="createdDate"
                        value={toDateInputValue(formData.createdDate)}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Ngày cập nhật gần nhất</label>
                      <Input
                        type="date"
                        name="updatedDate"
                        value={toDateInputValue(formData.updatedDate)}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </>
                  : null
              }

              <div className="flex items-center">
                <Input
                  type="checkbox"
                  name="isEnable"
                  checked={formData.isEnable}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label className="ml-2 block text-sm text-gray-900">Kích hoạt tài khoản</label>
              </div>
              <div className="flex justify-end gap-4 mt-6">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md"
                  disabled={formLoading}
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                  disabled={formLoading}
                >
                  {formLoading && <Spinner_C size="sm" color="white" />}
                  {editingUser ? 'Cập nhật' : 'Thêm mới'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
