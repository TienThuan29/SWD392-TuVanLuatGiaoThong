"use client";

import React, { useState, useEffect } from "react";
import { Law } from "@/models/Law";
import {
  FaEdit,
  FaTrash,
  FaPlus,
  FaUpload,
  FaFilePdf,
  FaLink,
  FaEye,
} from "react-icons/fa";
import { Input } from "@/components/modern-ui/input";
import { useFileManager } from "@/hooks/useFileManager";
import { useLawCrud } from "@/hooks/useLawCrud";
import { useLawTypeCrud } from "@/hooks/useLawTypeCrud";
import { Select } from "@/components/modern-ui/select";
import {
  formatDateToISO,
  formatDateForDisplay,
} from "@/ownUtils/all/dateFormatUtil";
import { toast } from "sonner";
import Spinner_C from "@/components/combination/Spinner_C";

export default function LawManagementSection() {
  const { uploadedFile, uploadFile, clearUploadedFile } = useFileManager();
  const {
    laws,
    loading: lawLoading,
    getAllLaws,
    createLaw,
    updateLaw,
    deleteLaw,
  } = useLawCrud();
  const { lawTypes, getAllLawTypes } = useLawTypeCrud();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [viewingLaw, setViewingLaw] = useState<Law | null>(null);
  const [editingLaw, setEditingLaw] = useState<Law | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedLawTypeId, setSelectedLawTypeId] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<Law>>({
    title: "",
    referenceNumber: "",
    dateline: "",
    issueDate: "",
    effectiveDate: "",
    sourceUrl: "",
    filePath: "",
  });

  // Load data on component mount
  useEffect(() => {
    getAllLaws();
    getAllLawTypes();
  }, []);

  // Update form data when file is uploaded
  useEffect(() => {
    if (uploadedFile) {
      setFormData((prev) => ({
        ...prev,
        filePath: uploadedFile.fileUrl,
      }));
    }
  }, [uploadedFile]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    if (name === "lawTypeId") {
      setSelectedLawTypeId(value);
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]:
          type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
      }));
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setSelectedFile(file);
    try {
      await uploadFile(file, "laws");
    } catch (error) {
      console.error("Upload failed:", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setIsSubmitting(true);

      // Get the selected law type object
      const selectedLawType = lawTypes.find(
        (type) => type.id === selectedLawTypeId
      );

      // Validate required fields
      const requiredFields = {
        title: formData.title,
        lawType: selectedLawType,
        issueDate: formData.issueDate,
        effectiveDate: formData.effectiveDate,
      };

      const emptyFields = Object.entries(requiredFields)
        .filter(([key, value]) => !value)
        .map(([key]) => key);

      if (emptyFields.length > 0) {
        const fieldNames = {
          title: "Tiêu đề",
          lawType: "Loại luật",
          issueDate: "Ngày ban hành",
          effectiveDate: "Ngày hiệu lực",
        };

        const missingFields = emptyFields
          .map((field) => fieldNames[field as keyof typeof fieldNames])
          .join(", ");
        toast.error(
          `Vui lòng điền đầy đủ các trường bắt buộc: ${missingFields}`
        );
        return;
      }

      if (editingLaw) {
        // Update existing law
        await updateLaw(editingLaw.id!, {
          ...formData,
          issueDate: formData.issueDate
            ? formatDateToISO(formData.issueDate)
            : undefined,
          effectiveDate: formData.effectiveDate
            ? formatDateToISO(formData.effectiveDate)
            : undefined,
          lawTypeId: selectedLawType?.id,
        });
        toast.success("Cập nhật luật thành công!");
      } else {
        // Create new law - handle file upload first
        let finalFilePath = formData.filePath;

        if (selectedFile && !uploadedFile) {
          // File needs to be uploaded first
          try {
            console.log("Uploading file:", selectedFile.name);
            const fileData = await uploadFile(selectedFile, "laws");
            console.log("Upload result:", fileData);
            finalFilePath = fileData.fileUrl;
            console.log("Final file path:", finalFilePath);
            toast.success("File đã được tải lên thành công!");
          } catch (uploadError) {
            console.error("File upload failed:", uploadError);
            toast.error("Tải file lên thất bại. Vui lòng thử lại.");
            return;
          }
        } else if (uploadedFile) {
          // File already uploaded
          console.log("Using already uploaded file:", uploadedFile);
          finalFilePath = uploadedFile.fileUrl;
        }

        // Create the law with the uploaded file path
        // console.log(formData)
        await createLaw({
          ...formData,
          issueDate: formData.issueDate
            ? formatDateToISO(formData.issueDate)
            : undefined,
          effectiveDate: formData.effectiveDate
            ? formatDateToISO(formData.effectiveDate)
            : undefined,
          lawTypeId: selectedLawType?.id,
          filePath: finalFilePath,
        });

        toast.success("Luật đã được tạo thành công!");
      }

      // Refresh the laws list
      await getAllLaws();

      // Reset form and close modal
      setIsModalOpen(false);
      setEditingLaw(null);
      setFormData({
        title: "",
        referenceNumber: "",
        dateline: "",
        issueDate: "",
        effectiveDate: "",
        sourceUrl: "",
        filePath: "",
      });
      setSelectedLawTypeId("");
      setSelectedFile(null);
      clearUploadedFile();
    } catch (error) {
      console.error("Operation failed:", error);
      toast.error("Có lỗi xảy ra. Vui lòng thử lại.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = (law: Law) => {
    setEditingLaw(law);
    setFormData(law);
    setSelectedLawTypeId(law.lawType?.id || "");
    setSelectedFile(null);
    clearUploadedFile();
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa luật này?")) {
      setDeleteLoading(id);
      try {
        await deleteLaw(id);
        toast.success("Xóa luật thành công");
        await getAllLaws(); // Refresh the list
      } catch (error) {
        console.error("Delete failed:", error);
        toast.error("Có lỗi xảy ra khi xóa luật");
      } finally {
        setDeleteLoading(null);
      }
    }
  };

  const handleOpenCreateModal = () => {
    setEditingLaw(null);
    setFormData({
      title: "",
      referenceNumber: "",
      dateline: "",
      issueDate: "",
      effectiveDate: "",
      sourceUrl: "",
      filePath: "",
    });
    setSelectedLawTypeId("");
    setSelectedFile(null);
    clearUploadedFile();
    setIsModalOpen(true);
  };

  const handleView = (law: Law) => {
    setViewingLaw(law);
    setIsViewModalOpen(true);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">
          Quản lý dữ liệu luật
        </h2>
        <button
          onClick={handleOpenCreateModal}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 dark:bg-blue-700 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-800 transition-colors"
        >
          <FaPlus /> Thêm luật mới
        </button>
      </div>

      {/* Law Table */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden transition-colors duration-200">
        {lawLoading ? (
          <div className="flex justify-center items-center py-12">
            <div className="text-center">
              <Spinner_C size="lg" color="blue-600" />
              <p className="mt-6 mr-6 text-gray-600 dark:text-gray-300">
                Đang tải dữ liệu...
              </p>
            </div>
          </div>
        ) : (
          <>
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 table-fixed">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-6 py-3 w-1/3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Tiêu đề
                  </th>
                  <th className="px-6 py-3 w-1/6 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Loại luật
                  </th>
                  <th className="px-6 py-3 w-1/6 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Ngày ban hành
                  </th>
                  <th className="px-6 py-3 w-1/6 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Ngày hiệu lực
                  </th>
                  <th className="px-6 py-3 w-1/6 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Tài liệu
                  </th>
                  <th className="px-6 py-3 w-1/6 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Thao tác
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {laws.map((law) => (
                  <tr
                    key={law.id}
                    className="hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    <td
                      className="px-6 py-4 max-w-xs truncate text-gray-900 dark:text-white"
                      title={law.title}
                    >
                      {law.title}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-900 dark:text-white">
                      {law.lawType?.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-900 dark:text-white">
                      {formatDateForDisplay(law.issueDate)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-900 dark:text-white">
                      {formatDateForDisplay(law.effectiveDate)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex gap-2">
                        {law.filePath && (
                          <a
                            href={`/pdf-viewer?url=${encodeURIComponent(
                              law.filePath
                            )}&title=${encodeURIComponent(
                              law.title || "Tài liệu PDF"
                            )}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 dark:text-blue-400 hover:text-blue-900 dark:hover:text-blue-300"
                            title="Xem PDF"
                          >
                            <FaFilePdf className="h-5 w-5" />
                          </a>
                        )}
                        {law.sourceUrl && (
                          <a
                            href={law.sourceUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 dark:text-blue-400 hover:text-blue-900 dark:hover:text-blue-300"
                          >
                            <FaLink className="h-5 w-5" />
                          </a>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => handleView(law)}
                        className="text-green-600 dark:text-green-400 hover:text-green-900 dark:hover:text-green-300 mr-4"
                        title="Xem chi tiết"
                      >
                        <FaEye />
                      </button>
                      <button
                        onClick={() => handleEdit(law)}
                        className="text-blue-600 dark:text-blue-400 hover:text-blue-900 dark:hover:text-blue-300 mr-4"
                        disabled={deleteLoading === law.id}
                        title="Chỉnh sửa"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => handleDelete(law.id!)}
                        className="text-red-600 dark:text-red-400 hover:text-red-900 dark:hover:text-red-300 disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={deleteLoading === law.id}
                        title="Xóa"
                      >
                        {deleteLoading === law.id ? (
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
            {laws.length === 0 && !lawLoading && (
              <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                Không có dữ liệu luật
              </div>
            )}
          </>
        )}
      </div>

      {/* View Detail Modal */}
      {isViewModalOpen && viewingLaw && (
        <div className="fixed inset-0 backdrop-blur-sm bg-white/30 dark:bg-black/30 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-2xl shadow-xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
                Chi tiết luật
              </h3>
              <button
                onClick={() => setIsViewModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 text-2xl font-bold"
              >
                ×
              </button>
            </div>

            <div className="space-y-6">
              {/* Title */}
              <div>
                <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  {viewingLaw.title}
                </h4>
                <div className="border-b border-gray-200 pb-2"></div>
              </div>

              {/* Basic Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Loại luật
                  </label>
                  <p className="text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-700 px-3 py-2 rounded-md">
                    {viewingLaw.lawType?.name || "Chưa phân loại"}
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Số hiệu văn bản
                  </label>
                  <p className="text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-700 px-3 py-2 rounded-md">
                    {viewingLaw.referenceNumber || "Chưa có"}
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Số ký hiệu
                  </label>
                  <p className="text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-700 px-3 py-2 rounded-md">
                    {viewingLaw.dateline || "Chưa có"}
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Ngày ban hành
                  </label>
                  <p className="text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-700 px-3 py-2 rounded-md">
                    {viewingLaw.issueDate || "Chưa có"}
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Ngày hiệu lực
                  </label>
                  <p className="text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-700 px-3 py-2 rounded-md">
                    {viewingLaw.effectiveDate || "Chưa có"}
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Ngày tạo
                  </label>
                  <p className="text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-700 px-3 py-2 rounded-md">
                    {viewingLaw.createdDate
                      ? new Date(viewingLaw.createdDate).toLocaleDateString(
                          "vi-VN"
                        )
                      : "Chưa có"}
                  </p>
                </div>
              </div>

              {/* Source URL */}
              {viewingLaw.sourceUrl && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Link nguồn
                  </label>
                  <a
                    href={`/pdf-viewer?url=${encodeURIComponent(
                      viewingLaw.sourceUrl
                    )}&title=${encodeURIComponent(
                      viewingLaw.title || "Tài liệu PDF"
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gray-50 dark:bg-gray-700 px-3 py-2 rounded-md inline-flex items-center gap-2"
                  >
                    <FaLink className="h-4 w-4" />
                    {viewingLaw.sourceUrl}
                  </a>
                </div>
              )}

              {/* File Attachment */}
              {viewingLaw.filePath && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Tài liệu đính kèm
                  </label>
                  <a
                    href={`/pdf-viewer?url=${encodeURIComponent(
                      viewingLaw.filePath
                    )}&title=${encodeURIComponent(
                      viewingLaw.title || "Tài liệu PDF"
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 dark:text-blue-400 hover:text-blue-900 dark:hover:text-blue-300 bg-gray-50 dark:bg-gray-700 px-3 py-2 rounded-md inline-flex items-center gap-2"
                  >
                    <FaFilePdf className="h-4 w-4" />
                    Xem tài liệu PDF
                  </a>
                </div>
              )}
            </div>

            <div className="flex justify-end gap-4 mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
              <button
                onClick={() => setIsViewModalOpen(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-md"
              >
                Đóng
              </button>
              <button
                onClick={() => {
                  setIsViewModalOpen(false);
                  handleEdit(viewingLaw);
                }}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 dark:bg-blue-700 hover:bg-blue-700 dark:hover:bg-blue-800 rounded-md flex items-center gap-2"
              >
                <FaEdit />
                Chỉnh sửa
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 backdrop-blur-sm bg-white/30 dark:bg-black/30 flex items-center justify-center">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md shadow-xl">
            <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
              {editingLaw ? "Chỉnh sửa luật" : "Thêm luật mới"}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* File Upload Section */}
              <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center">
                <Input
                  type="file"
                  id="file-upload"
                  className="hidden"
                  onChange={handleFileUpload}
                  accept=".pdf,.doc,.docx"
                />
                <label
                  htmlFor="file-upload"
                  className="cursor-pointer flex flex-col items-center"
                >
                  <FaUpload className="h-8 w-8 text-gray-400 mb-2" />
                  <span className="text-sm text-gray-600 dark:text-gray-300">
                    {uploadedFile
                      ? "File đã tải lên thành công"
                      : selectedFile
                      ? "Đang tải lên..."
                      : "Click để tải file lên"}
                  </span>
                  {uploadedFile && (
                    <span className="text-xs text-gray-500 mt-1">
                      {uploadedFile.fileName}
                    </span>
                  )}
                  {selectedFile && !uploadedFile && (
                    <span className="text-xs text-gray-500 mt-1">
                      {selectedFile.name}
                    </span>
                  )}
                </label>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Tiêu đề
                </label>
                <Input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Số hiệu văn bản
                </label>
                <Input
                  type="text"
                  name="referenceNumber"
                  value={formData.referenceNumber}
                  onChange={handleInputChange}
                  placeholder="VD: 23/2023/QH15"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Nơi ký và ngày ký
                </label>
                <Input
                  type="text"
                  name="dateline"
                  value={formData.dateline}
                  onChange={handleInputChange}
                  placeholder="VD: HaNoi, 1/1/2025"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Loại luật
                </label>
                <Select
                  name="lawTypeId"
                  value={selectedLawTypeId}
                  onChange={handleInputChange}
                  required
                >
                  <option key="default" value="">
                    Chọn loại luật
                  </option>
                  {lawTypes.map((type) => (
                    <option key={type.id} value={type.id}>
                      {type.name}
                    </option>
                  ))}
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Ngày ban hành
                </label>
                <Input
                  type="date"
                  name="issueDate"
                  value={formData.issueDate}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Ngày hiệu lực
                </label>
                <Input
                  type="date"
                  name="effectiveDate"
                  value={formData.effectiveDate}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Link nguồn
                </label>
                <Input
                  type="url"
                  name="sourceUrl"
                  value={formData.sourceUrl}
                  onChange={handleInputChange}
                  placeholder="https://chinhphu.com.vn"
                />
              </div>

              <div className="flex justify-end gap-4 mt-6">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-md"
                  disabled={isSubmitting}
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 dark:bg-blue-700 hover:bg-blue-700 dark:hover:bg-blue-800 rounded-md disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {isSubmitting && <Spinner_C size="sm" color="white" />}
                  {isSubmitting
                    ? "Đang xử lý..."
                    : editingLaw
                    ? "Cập nhật"
                    : "Thêm mới"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
