"use client";

import React, { useState, useEffect, useRef } from "react";
import { UsagePackage } from "@/models/UsagePackage";
import { FaEdit, FaTrash, FaPlus, FaEye } from "react-icons/fa";
import { Input } from "@/components/modern-ui/input";
import { useUsagePackageCrud } from "@/hooks/useUsagePackageCrud";
import Spinner_C from "@/components/combination/Spinner_C";

export default function UsagePackageSection() {
  const {
    usagePackages,
    loading,
    getAllUsagePackages,
    createUsagePackage,
    updateUsagePackage,
    deleteUsagePackage,
  } = useUsagePackageCrud();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPackage, setEditingPackage] = useState<UsagePackage | null>(null);
  const [viewingPackage, setViewingPackage] = useState<UsagePackage | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [formData, setFormData] = useState<Partial<UsagePackage>>({
    name: "",
    description: "",
    price: 0,
    dailyLimit: 0,
    daysLimit: 0,
    isDeleted: false,
  });

  // Column resizing state
  const [columnWidths, setColumnWidths] = useState({
    name: 200,
    description: 150,
    price: 150,
    dailyLimit: 150,
    daysLimit: 120,
    status: 150,
    actions: 120,
  });
  const [isResizing, setIsResizing] = useState(false);
  const [resizingColumn, setResizingColumn] = useState<string | null>(null);
  const tableRef = useRef<HTMLTableElement>(null);

  // Fetch data on component mount
  useEffect(() => {
    getAllUsagePackages();
  }, [getAllUsagePackages]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : name === "price" || name === "dailyLimit" || name === "daysLimit" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingPackage) {
        await updateUsagePackage(editingPackage.id!, formData);
      } else {
        await createUsagePackage(formData);
      }
      setIsModalOpen(false);
      setEditingPackage(null);
      setFormData({
        name: "",
        description: "",
        price: 0,
        dailyLimit: 0,
        daysLimit: 0,
        isDeleted: false,
      });
    } catch (error) {
      console.error("Error saving package:", error);
    }
  };

  const handleEdit = (pkg: UsagePackage) => {
    setEditingPackage(pkg);
    setFormData({
      ...pkg,
      description: pkg.description || "",
    });
    setIsModalOpen(true);
  };

  const handleView = (pkg: UsagePackage) => {
    setViewingPackage(pkg);
    setIsViewModalOpen(true);
  };

  const handleDelete = async (id?: string) => {
    if (id) {
      try {
        await deleteUsagePackage(id);
      } catch (error) {
        console.error("Error deleting package:", error);
      }
    }
  };

  // Column resizing handlers
  const handleMouseDown = (e: React.MouseEvent, column: string) => {
    e.preventDefault();
    setIsResizing(true);
    setResizingColumn(column);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isResizing || !resizingColumn || !tableRef.current) return;

    const tableRect = tableRef.current.getBoundingClientRect();
    const newWidth = e.clientX - tableRect.left;

    setColumnWidths(prev => ({
      ...prev,
      [resizingColumn]: Math.max(100, newWidth), // Minimum width of 100px
    }));
  };

  const handleMouseUp = () => {
    setIsResizing(false);
    setResizingColumn(null);
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  };

  return (
    <div className="p-6 dark:bg-gray-900">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">Quản lý gói sử dụng</h2>
        <button
          onClick={() => {
            setEditingPackage(null);
            setFormData({
              name: "",
              description: "",
              price: 0,
              dailyLimit: 0,
              daysLimit: 0,
              isDeleted: false,
            });
            setIsModalOpen(true);
          }}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 dark:bg-blue-700 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-800 transition-colors"
        >
          <FaPlus /> Thêm gói mới
        </button>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="flex justify-center items-center py-12">
          <div className="text-center">
            <Spinner_C size="lg" color="blue-600" />
            <p className="mt-6 text-gray-600 dark:text-gray-400">Đang tải dữ liệu...</p>
          </div>
        </div>
      )}

      {/* Package Table */}
      {!loading && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table ref={tableRef} className="w-full divide-y divide-gray-200 dark:divide-gray-700" style={{ tableLayout: 'fixed', minWidth: '1000px' }}>
              <thead className="bg-gray-50 dark:bg-gray-800">
                <tr>
                  <th
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider relative"
                    style={{ width: columnWidths.name }}
                  >
                    Tên gói
                    <div
                      className="absolute right-0 top-0 bottom-0 w-1 cursor-col-resize hover:bg-blue-400"
                      onMouseDown={(e) => handleMouseDown(e, 'name')}
                    />
                  </th>
                  <th
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider relative"
                    style={{ width: columnWidths.description }}
                  >
                    Mô tả
                    <div
                      className="absolute right-0 top-0 bottom-0 w-1 cursor-col-resize hover:bg-blue-400"
                      onMouseDown={(e) => handleMouseDown(e, 'description')}
                    />
                  </th>
                  <th
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider relative"
                    style={{ width: columnWidths.price }}
                  >
                    Giá (VNĐ)
                    <div
                      className="absolute right-0 top-0 bottom-0 w-1 cursor-col-resize hover:bg-blue-400"
                      onMouseDown={(e) => handleMouseDown(e, 'price')}
                    />
                  </th>
                  <th
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider relative"
                    style={{ width: columnWidths.dailyLimit }}
                  >
                    Giới hạn/ngày
                    <div
                      className="absolute right-0 top-0 bottom-0 w-1 cursor-col-resize hover:bg-blue-400"
                      onMouseDown={(e) => handleMouseDown(e, 'dailyLimit')}
                    />
                  </th>
                  <th
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider relative"
                    style={{ width: columnWidths.daysLimit }}
                  >
                    Số ngày
                    <div
                      className="absolute right-0 top-0 bottom-0 w-1 cursor-col-resize hover:bg-blue-400"
                      onMouseDown={(e) => handleMouseDown(e, 'daysLimit')}
                    />
                  </th>
                  <th
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider relative"
                    style={{ width: columnWidths.status }}
                  >
                    Trạng thái
                    <div
                      className="absolute right-0 top-0 bottom-0 w-1 cursor-col-resize hover:bg-blue-400"
                      onMouseDown={(e) => handleMouseDown(e, 'status')}
                    />
                  </th>
                  <th
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider relative"
                    style={{ width: columnWidths.actions }}
                  >
                    Thao tác
                    <div
                      className="absolute right-0 top-0 bottom-0 w-1 cursor-col-resize hover:bg-blue-400"
                      onMouseDown={(e) => handleMouseDown(e, 'actions')}
                    />
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {usagePackages.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-6 py-4 text-center text-gray-500 dark:text-gray-400">
                      Không có dữ liệu gói sử dụng
                    </td>
                  </tr>
                ) : (
                  usagePackages.map((pkg) => (
                    <tr key={pkg.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                      <td className="px-6 py-4 whitespace-nowrap overflow-hidden text-ellipsis text-gray-900 dark:text-gray-100" style={{ width: columnWidths.name }}>
                        <div className="truncate" title={pkg.name}>
                          {pkg.name}
                        </div>
                      </td>
                      <td className="px-6 py-4 overflow-hidden text-ellipsis" style={{ width: columnWidths.description }}>
                        <div className="truncate" title={pkg.description}>
                          {pkg.description}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap overflow-hidden text-ellipsis" style={{ width: columnWidths.price }}>
                        <div className="truncate" title={pkg.price?.toLocaleString()}>
                          {pkg.price?.toLocaleString()}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap overflow-hidden text-ellipsis" style={{ width: columnWidths.dailyLimit }}>
                        <div className="truncate" title={pkg.dailyLimit?.toString()}>
                          {pkg.dailyLimit}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap overflow-hidden text-ellipsis" style={{ width: columnWidths.daysLimit }}>
                        <div className="truncate" title={pkg.daysLimit?.toString()}>
                          {pkg.daysLimit}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap overflow-hidden text-ellipsis" style={{ width: columnWidths.status }}>
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${pkg.isDeleted
                            ? 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200'
                            : 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200'
                          }`}>
                          {pkg.isDeleted ? 'Đã xóa' : 'Đang hoạt động'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium overflow-hidden text-ellipsis" style={{ width: columnWidths.actions }}>
                        <button
                          onClick={() => handleView(pkg)}
                          className="text-green-600 dark:text-green-400 hover:text-green-900 dark:hover:text-green-300 mr-4"
                          title="Xem chi tiết"
                        >
                          <FaEye />
                        </button>
                        <button
                          onClick={() => handleEdit(pkg)}
                          className="text-blue-600 dark:text-blue-400 hover:text-blue-900 dark:hover:text-blue-300 mr-4"
                          title="Chỉnh sửa"
                        >
                          <FaEdit />
                        </button>
                        <button
                          onClick={() => handleDelete(pkg.id)}
                          className="text-red-600 dark:text-red-400 hover:text-red-900 dark:hover:text-red-300"
                          title="Xóa"
                        >
                          <FaTrash />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 backdrop-blur-sm bg-white/30 dark:bg-black/30 flex items-center justify-center">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md shadow-xl">
            <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">
              {editingPackage ? "Chỉnh sửa gói sử dụng" : "Thêm gói sử dụng mới"}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Tên gói</label>
                <Input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Mô tả</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={3}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
                  placeholder="Nhập mô tả gói sử dụng..."
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
                  name="dailyLimit"
                  value={formData.dailyLimit}
                  onChange={handleInputChange}
                  required
                  min={0}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Số ngày</label>
                <Input
                  type="number"
                  name="daysLimit"
                  value={formData.daysLimit}
                  onChange={handleInputChange}
                  required
                  min={0}
                />
              </div>
              <div className="flex items-center">
                <Input
                  type="checkbox"
                  name="isDeleted"
                  checked={formData.isDeleted}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label className="ml-2 block text-sm text-gray-900">Đánh dấu đã xóa</label>
              </div>
              <div className="flex justify-end gap-4 mt-6">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-600 hover:bg-gray-200 dark:hover:bg-gray-500 rounded-md"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 dark:bg-blue-700 hover:bg-blue-700 dark:hover:bg-blue-800 rounded-md"
                >
                  {editingPackage ? "Cập nhật" : "Thêm mới"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View Detail Modal */}
      {isViewModalOpen && viewingPackage && (
        <div className="fixed inset-0 backdrop-blur-sm bg-white/30 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-xl">
            <h3 className="text-lg font-semibold mb-4">Chi tiết gói sử dụng</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Tên gói</label>
                <p className="mt-1 text-sm text-gray-900 bg-gray-50 px-3 py-2 rounded-md">
                  {viewingPackage.name}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Mô tả</label>
                <p className="mt-1 text-sm text-gray-900 bg-gray-50 px-3 py-2 rounded-md whitespace-pre-wrap">
                  {viewingPackage.description || "Không có mô tả"}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Giá (VNĐ)</label>
                <p className="mt-1 text-sm text-gray-900 bg-gray-50 px-3 py-2 rounded-md">
                  {viewingPackage.price?.toLocaleString()}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Giới hạn/ngày</label>
                <p className="mt-1 text-sm text-gray-900 bg-gray-50 px-3 py-2 rounded-md">
                  {viewingPackage.dailyLimit}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Số ngày</label>
                <p className="mt-1 text-sm text-gray-900 bg-gray-50 px-3 py-2 rounded-md">
                  {viewingPackage.daysLimit}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Trạng thái</label>
                <p className="mt-1">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${viewingPackage.isDeleted ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
                    {viewingPackage.isDeleted ? 'Đã xóa' : 'Đang hoạt động'}
                  </span>
                </p>
              </div>
              <div className="flex justify-end mt-6">
                <button
                  type="button"
                  onClick={() => setIsViewModalOpen(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md"
                >
                  Đóng
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
