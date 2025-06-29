'use client';

import React, { useState, useEffect } from 'react';
import { Law, LawType } from '@/models/Law';
import { FaEdit, FaTrash, FaPlus, FaUpload, FaFilePdf, FaLink } from 'react-icons/fa';
import { Input } from '@/components/modern-ui/input';
import { useFileManager } from '@/hooks/useFileManager';
import { useLawCrud } from '@/hooks/useLawCrud';
import { useLawTypeCrud } from '@/hooks/useLawTypeCrud';
import { Select } from '@/components/modern-ui/select';
import { formatDateToISO } from '@/ownUtils/all/dateFormatUtil';
import { toast } from 'sonner';

export default function LawManagementSection() {
  
  const { uploadedFile, loading: fileLoading, uploadFile, clearUploadedFile } = useFileManager();
  const { laws, loading: lawLoading, getAllLaws, createLaw, updateLaw, deleteLaw } = useLawCrud();
  const { lawTypes, getAllLawTypes } = useLawTypeCrud();
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingLaw, setEditingLaw] = useState<Law | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedLawTypeId, setSelectedLawTypeId] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<Partial<Law>>({
    title: '',
    referenceNumber: '',
    dateline: '',
    issueDate: '',
    effectiveDate: '',
    sourceUrl: '',
    filePath: '',
  });

  // Load data on component mount
  useEffect(() => {
    getAllLaws();
    getAllLawTypes();
  }, []);

  // Update form data when file is uploaded
  useEffect(() => {
    if (uploadedFile) {
      setFormData(prev => ({
        ...prev,
        filePath: uploadedFile.fileUrl
      }));
    }
  }, [uploadedFile]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (name === 'lawTypeId') {
      setSelectedLawTypeId(value);
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
      }));
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setSelectedFile(file);
    try {
      await uploadFile(file, 'laws');
    } catch (error) {
      console.error('Upload failed:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setIsSubmitting(true);
      
      // Get the selected law type object
      const selectedLawType = lawTypes.find(type => type.id === selectedLawTypeId);
      
      // Validate required fields
      const requiredFields = {
        title: formData.title,
        lawType: selectedLawType,
        issueDate: formData.issueDate,
        effectiveDate: formData.effectiveDate
      };

      const emptyFields = Object.entries(requiredFields)
        .filter(([key, value]) => !value)
        .map(([key]) => key);

      if (emptyFields.length > 0) {
        const fieldNames = {
          title: 'Tiêu đề',
          lawType: 'Loại luật',
          issueDate: 'Ngày ban hành',
          effectiveDate: 'Ngày hiệu lực'
        };
        
        const missingFields = emptyFields.map(field => fieldNames[field as keyof typeof fieldNames]).join(', ');
        toast.error(`Vui lòng điền đầy đủ các trường bắt buộc: ${missingFields}`);
        return;
      }

      if (editingLaw) {
        // Update existing law
        await updateLaw(editingLaw.id!, {
          ...formData,
          issueDate: formData.issueDate ? formatDateToISO(formData.issueDate) : undefined,
          effectiveDate: formData.effectiveDate ? formatDateToISO(formData.effectiveDate) : undefined,
          lawType: selectedLawType
        });
      } 
      else {
        // Create new law - handle file upload first
        let finalFilePath = formData.filePath;
        
        if (selectedFile && !uploadedFile) {
          // File needs to be uploaded first
          try {
            const fileData = await uploadFile(selectedFile, 'laws');
            finalFilePath = fileData.fileUrl;
            toast.success('File đã được tải lên thành công!');
          } catch (uploadError) {
            console.error('File upload failed:', uploadError);
            toast.error('Tải file lên thất bại. Vui lòng thử lại.');
            return;
          }
        } else if (uploadedFile) {
          // File already uploaded
          finalFilePath = uploadedFile.fileUrl;
        }
        
        // Create the law with the uploaded file path
        await createLaw({
          ...formData,
          issueDate: formData.issueDate ? formatDateToISO(formData.issueDate) : undefined,
          effectiveDate: formData.effectiveDate ? formatDateToISO(formData.effectiveDate) : undefined,
          lawType: selectedLawType,
          filePath: finalFilePath
        });
        
        toast.success('Luật đã được tạo thành công!');
      }
      
      // Reset form and close modal
      setIsModalOpen(false);
      setEditingLaw(null);
      setFormData({
        title: '',
        referenceNumber: '',
        dateline: '',
        issueDate: '',
        effectiveDate: '',
        sourceUrl: '',
        filePath: '',
      });
      setSelectedLawTypeId('');
      setSelectedFile(null);
      clearUploadedFile();
    } catch (error) {
      console.error('Operation failed:', error);
      toast.error('Có lỗi xảy ra. Vui lòng thử lại.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = (law: Law) => {
    setEditingLaw(law);
    setFormData(law);
    setSelectedLawTypeId(law.lawType?.id || '');
    setSelectedFile(null);
    clearUploadedFile();
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteLaw(id);
    } catch (error) {
      console.error('Delete failed:', error);
    }
  };

  const handleOpenCreateModal = () => {
    setEditingLaw(null);
    setFormData({
      title: '',
      referenceNumber: '',
      dateline: '',
      issueDate: '',
      effectiveDate: '',
      sourceUrl: '',
      filePath: '',
    });
    setSelectedLawTypeId('');
    setSelectedFile(null);
    clearUploadedFile();
    setIsModalOpen(true);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">Quản lý dữ liệu luật</h2>
        <button
          onClick={handleOpenCreateModal}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <FaPlus /> Thêm luật mới
        </button>
      </div>

      {/* Law Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tiêu đề</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Loại luật</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ngày ban hành</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ngày hiệu lực</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tài liệu</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Thao tác</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {laws.map((law) => (
              <tr key={law.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">{law.title}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {law.lawType?.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{law.issueDate}</td>
                <td className="px-6 py-4 whitespace-nowrap">{law.effectiveDate}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex gap-2">
                    {law.filePath && (
                      <a
                        href={law.filePath}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-900"
                      >
                        <FaFilePdf className="h-5 w-5" />
                      </a>
                    )}
                    {law.sourceUrl && (
                      <a
                        href={law.sourceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-900"
                      >
                        <FaLink className="h-5 w-5" />
                      </a>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => handleEdit(law)}
                    className="text-blue-600 hover:text-blue-900 mr-4"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(law.id!)}
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
              {editingLaw ? 'Chỉnh sửa luật' : 'Thêm luật mới'}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* File Upload Section */}
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
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
                  <span className="text-sm text-gray-600">
                    {uploadedFile ? 'File đã tải lên thành công' : selectedFile ? 'Đang tải lên...' : 'Click để tải file lên'}
                  </span>
                  {uploadedFile && (
                    <span className="text-xs text-gray-500 mt-1">{uploadedFile.fileName}</span>
                  )}
                  {selectedFile && !uploadedFile && (
                    <span className="text-xs text-gray-500 mt-1">{selectedFile.name}</span>
                  )}
                </label>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Tiêu đề</label>
                <Input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Số hiệu văn bản</label>
                <Input
                  type="text"
                  name="referenceNumber"
                  value={formData.referenceNumber}
                  onChange={handleInputChange}
                  placeholder="VD: 23/2023/QH15"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Số ký hiệu</label>
                <Input
                  type="text"
                  name="dateline"
                  value={formData.dateline}
                  onChange={handleInputChange}
                  placeholder="VD: 23/2023/QH15"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Loại luật</label>
                <Select
                  name="lawTypeId"
                  value={selectedLawTypeId}
                  onChange={handleInputChange}
                  required
                >
                  <option key="default" value="">Chọn loại luật</option>
                  {lawTypes.map(type => (
                    <option key={type.id} value={type.id}>{type.name}</option>
                  ))}
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Ngày ban hành</label>
                <Input
                  type="date"
                  name="issueDate"
                  value={formData.issueDate}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Ngày hiệu lực</label>
                <Input
                  type="date"
                  name="effectiveDate"
                  value={formData.effectiveDate}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Link nguồn</label>
                <Input
                  type="url"
                  name="sourceUrl"
                  value={formData.sourceUrl}
                  onChange={handleInputChange}
                  placeholder="https://example.com"
                />
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
                  disabled={isSubmitting}
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Đang xử lý...' : (editingLaw ? 'Cập nhật' : 'Thêm mới')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
