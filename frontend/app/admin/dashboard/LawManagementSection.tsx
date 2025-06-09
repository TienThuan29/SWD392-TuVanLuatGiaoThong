'use client';

import React, { useState } from 'react';
import { Law, LawType } from '@/models/Law';
import { FaEdit, FaTrash, FaPlus, FaUpload, FaFilePdf, FaLink } from 'react-icons/fa';
import { Input } from '@/components/modern-ui/input';

// Sample data - Replace with actual API calls
const sampleLaws: Law[] = [
  {
    title: 'Luật Giao thông đường bộ',
    lawTypeId: '1',
    issueDate: '2024-01-01',
    effectiveDate: '2024-01-01',
    sourceUrl: 'https://example.com/law1',
    filePath: '/laws/law1.pdf',
    isDeleted: false,
    createdDate: '2024-01-01',
    updatedDate: '2024-01-01',
  },
];

const sampleLawTypes: LawType[] = [
  {
    id: '1',
    name: 'Luật Giao thông',
  },
  {
    id: '2',
    name: 'Nghị định',
  },
];

export default function LawManagementSection() {
  const [laws, setLaws] = useState<Law[]>(sampleLaws);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingLaw, setEditingLaw] = useState<Law | null>(null);
  const [uploadedFilePath, setUploadedFilePath] = useState<string>('');
  const [formData, setFormData] = useState<Partial<Law>>({
    title: '',
    lawTypeId: '',
    issueDate: '',
    effectiveDate: '',
    sourceUrl: '',
    filePath: '',
    isDeleted: false,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Here you would typically upload to your cloud storage
    // For now, we'll simulate a successful upload
    const fakeUpload = new Promise<string>((resolve) => {
      setTimeout(() => {
        resolve(`/laws/${file.name}`);
      }, 1000);
    });

    try {
      const filePath = await fakeUpload;
      setUploadedFilePath(filePath);
      setFormData(prev => ({
        ...prev,
        filePath
      }));
    } catch (error) {
      console.error('Upload failed:', error);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingLaw) {
      // Update existing law
      setLaws(laws.map(law => 
        law.id === editingLaw.id ? { ...law, ...formData } : law
      ));
    } else {
      // Add new law
      setLaws([...laws, { ...formData as Law, createdDate: new Date().toISOString(), updatedDate: new Date().toISOString() }]);
    }
    setIsModalOpen(false);
    setEditingLaw(null);
    setFormData({
      title: '',
      lawTypeId: '',
      issueDate: '',
      effectiveDate: '',
      sourceUrl: '',
      filePath: '',
      isDeleted: false,
    });
    setUploadedFilePath('');
  };

  const handleEdit = (law: Law) => {
    setEditingLaw(law);
    setFormData(law);
    setUploadedFilePath(law.filePath || '');
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    setLaws(laws.filter(law => law.id !== id));
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">Quản lý dữ liệu luật</h2>
        <button
          onClick={() => {
            setEditingLaw(null);
            setFormData({
              title: '',
              lawTypeId: '',
              issueDate: '',
              effectiveDate: '',
              sourceUrl: '',
              filePath: '',
              isDeleted: false,
            });
            setUploadedFilePath('');
            setIsModalOpen(true);
          }}
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
                  {sampleLawTypes.find(type => type.id === law.lawTypeId)?.name}
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
                    {uploadedFilePath ? 'File đã tải lên' : 'Click để tải file lên'}
                  </span>
                  {uploadedFilePath && (
                    <span className="text-xs text-gray-500 mt-1">{uploadedFilePath}</span>
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
                <label className="block text-sm font-medium text-gray-700">Loại luật</label>
                <select
                  name="lawTypeId"
                  value={formData.lawTypeId}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                >
                  <option key="default" value="">Chọn loại luật</option>
                  {sampleLawTypes.map(type => (
                    <option key={type.id} value={type.id}>{type.name}</option>
                  ))}
                </select>
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
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md"
                >
                  {editingLaw ? 'Cập nhật' : 'Thêm mới'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
