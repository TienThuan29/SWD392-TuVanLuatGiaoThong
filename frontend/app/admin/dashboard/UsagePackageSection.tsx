"use client";

import React, { useState } from "react";
import { UsagePackage } from "@/models/UsagePackage";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import { Input } from "@/components/modern-ui/input";

// Sample data - Replace with actual API calls
const samplePackages: UsagePackage[] = [
  {
    id: "1",
    name: "Gói cơ bản",
    descriptions: ["10 câu hỏi/ngày", "Hỗ trợ cơ bản"],
    price: 50000,
    daily_limit: 10,
    days_limit: 30,
    is_deleted: false,
    created_date: new Date().toISOString() as any,
    updated_date: new Date().toISOString() as any,
  },
];

export default function UsagePackageSection() {
  const [packages, setPackages] = useState<UsagePackage[]>(samplePackages);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPackage, setEditingPackage] = useState<UsagePackage | null>(null);
  const [formData, setFormData] = useState<Partial<UsagePackage>>({
    name: "",
    descriptions: [],
    price: 0,
    daily_limit: 0,
    days_limit: 0,
    is_deleted: false,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : name === "price" || name === "daily_limit" || name === "days_limit" ? Number(value) : value,
    }));
  };

  const handleDescriptionsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      descriptions: e.target.value.split(",").map((desc) => desc.trim()),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingPackage) {
      setPackages(
        packages.map((pkg) =>
          pkg.id === editingPackage.id ? { ...pkg, ...formData } : pkg
        )
      );
    } else {
      setPackages([
        ...packages,
        {
          ...formData,
          id: (Math.random() * 100000).toFixed(0),
          created_date: new Date().toISOString() as any,
          updated_date: new Date().toISOString() as any,
        } as UsagePackage,
      ]);
    }
    setIsModalOpen(false);
    setEditingPackage(null);
    setFormData({
      name: "",
      descriptions: [],
      price: 0,
      daily_limit: 0,
      days_limit: 0,
      is_deleted: false,
    });
  };

  const handleEdit = (pkg: UsagePackage) => {
    setEditingPackage(pkg);
    setFormData({
      ...pkg,
      descriptions: pkg.descriptions || [],
    });
    setIsModalOpen(true);
  };

  const handleDelete = (id?: string) => {
    setPackages(packages.filter((pkg) => pkg.id !== id));
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">Quản lý gói sử dụng</h2>
        <button
          onClick={() => {
            setEditingPackage(null);
            setFormData({
              name: "",
              descriptions: [],
              price: 0,
              daily_limit: 0,
              days_limit: 0,
              is_deleted: false,
            });
            setIsModalOpen(true);
          }}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <FaPlus /> Thêm gói mới
        </button>
      </div>

      {/* Package Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tên gói</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mô tả</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Giá (VNĐ)</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Giới hạn/ngày</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Số ngày</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Trạng thái</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Thao tác</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {packages.map((pkg) => (
              <tr key={pkg.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">{pkg.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{pkg.descriptions?.join(", ")}</td>
                <td className="px-6 py-4 whitespace-nowrap">{pkg.price?.toLocaleString()}</td>
                <td className="px-6 py-4 whitespace-nowrap">{pkg.daily_limit}</td>
                <td className="px-6 py-4 whitespace-nowrap">{pkg.days_limit}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${pkg.is_deleted ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
                    {pkg.is_deleted ? 'Đã xóa' : 'Đang hoạt động'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => handleEdit(pkg)}
                    className="text-blue-600 hover:text-blue-900 mr-4"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(pkg.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 backdrop-blur-sm bg-white/30 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-xl">
            <h3 className="text-lg font-semibold mb-4">
              {editingPackage ? "Chỉnh sửa gói sử dụng" : "Thêm gói sử dụng mới"}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Tên gói</label>
                <Input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Mô tả (phân tách bằng dấu phẩy)</label>
                <Input
                  type="text"
                  name="descriptions"
                  value={formData.descriptions?.join(", ")}
                  onChange={handleDescriptionsChange}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Giá (VNĐ)</label>
                <Input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  required
                  min={0}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Giới hạn/ngày</label>
                <Input
                  type="number"
                  name="daily_limit"
                  value={formData.daily_limit}
                  onChange={handleInputChange}
                  required
                  min={0}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Số ngày</label>
                <Input
                  type="number"
                  name="days_limit"
                  value={formData.days_limit}
                  onChange={handleInputChange}
                  required
                  min={0}
                />
              </div>
              <div className="flex items-center">
                <Input
                  type="checkbox"
                  name="is_deleted"
                  checked={formData.is_deleted}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label className="ml-2 block text-sm text-gray-900">Đánh dấu đã xóa</label>
              </div>
              <div className="flex justify-end gap-4 mt-6">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md"
                >
                  {editingPackage ? "Cập nhật" : "Thêm mới"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
