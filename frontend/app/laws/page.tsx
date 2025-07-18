"use client";

import { useEffect, useState } from "react";
import { useLawCrud } from "@/hooks/useLawCrud";
import { Law } from "@/models/Law";
import Spinner_C from "@/components/combination/Spinner_C";
import { Button } from "@/components/modern-ui/button";
import { Input } from "@/components/modern-ui/input";
import {
  Calendar,
  FileText,
  ExternalLink,
  Download,
  Search,
} from "lucide-react";
import HeaderTop_C from "@/components/combination/HeaderTop_C";
import { useAuth } from "@/context/AuthContext";
import { User } from "@/models/User";
import { Color } from "@/configs/CssConstant";
import Footer from "@/components/combination/Footer_C";

// Sample data for testing
const sampleLaws: Law[] = [
    {
        id: "1",
        title: "Luật Giao thông đường bộ 2008",
        referenceNumber: "23/2008/QH12",
        issueDate: "2008-11-13",
        effectiveDate: "2009-01-01",
        dateline: "Luật số 23/2008/QH12 về Giao thông đường bộ",
        filePath: "/docs/Luat_36202QH15_GiaoThongDuongBo.pdf",
        sourceUrl: "https://vanban.chinhphu.vn/default.aspx?pageid=27160&docid=88967",
        lawType: { id: "1", name: "Luật" }
    },
    {
        id: "2", 
        title: "Thông tư 13/2025/TT-BCA",
        referenceNumber: "13/2025/TT-BCA",
        issueDate: "2025-06-05",
        effectiveDate: "2025-07-01",
        dateline: "Thông tư hướng dẫn thực hiện một số điều của Luật Giao thông đường bộ",
        filePath: "/docs/Thong_tu_13_2025_TT-BCA.pdf",
        sourceUrl: "https://bca.gov.vn",
        lawType: { id: "2", name: "Thông tư"}
    },
    {
        id: "3",
        title: "Nghị định 80/2009/NĐ-CP",
        referenceNumber: "80/2009/NĐ-CP",
        issueDate: "2009-10-15",
        effectiveDate: "2009-11-01",
        dateline: "Quy định xử phạt vi phạm hành chính trong lĩnh vực giao thông đường bộ và đường sắt",
        filePath: "/docs/Nghi_dinh_80-2009-ND-CP.pdf",
        sourceUrl: "https://vanban.chinhphu.vn",
        lawType: { id: "3", name: "Nghị định"}
    },
    {
        id: "4",
        title: "Nghị định 130/2024/NĐ-CP",
        referenceNumber: "130/2024/NĐ-CP",
        issueDate: "2024-05-15",
        effectiveDate: "2024-07-01",
        dateline: "Sửa đổi, bổ sung một số điều của Nghị định số 80/2009/NĐ-CP",
        filePath: "/docs/Nghi_dinh_130-2024-ND-CP.pdf",
        sourceUrl: "https://vanban.chinhphu.vn",
        lawType: { id: "3", name: "Nghị định"}
    },
    {
        id: "5",
        title: "Nghị định 159/2024/NĐ-CP",
        referenceNumber: "159/2024/NĐ-CP",
        issueDate: "2024-12-20",
        effectiveDate: "2025-01-01",
        dateline: "Quy định chi tiết thi hành một số điều của Luật Trật tự, an toàn giao thông đường bộ",
        filePath: "/docs/Nghi_dinh_159-2024-ND-CP.pdf",
        sourceUrl: "https://vanban.chinhphu.vn",
        lawType: { id: "3", name: "Nghị định" }
    },
    {
        id: "6",
        title: "Nghị định 160/2024/NĐ-CP",
        referenceNumber: "160/2024/NĐ-CP",
        issueDate: "2024-12-20",
        effectiveDate: "2025-01-01",
        dateline: "Quy định xử phạt vi phạm hành chính trong lĩnh vực trật tự, an toàn giao thông đường bộ",
        filePath: "/docs/Nghi_dinh_160-2024-ND-CP.pdf",
        sourceUrl: "https://vanban.chinhphu.vn",
        lawType: { id: "3", name: "Nghị định" }
    },
    {
        id: "7",
        title: "Nghị định 161/2024/NĐ-CP",
        referenceNumber: "161/2024/NĐ-CP",
        issueDate: "2024-12-20",
        effectiveDate: "2025-01-01",
        dateline: "Quy định chi tiết và hướng dẫn thi hành một số điều của Luật Xử lý vi phạm hành chính",
        filePath: "/docs/Nghi_dinh_161-2024-ND-CP.pdf",
        sourceUrl: "https://vanban.chinhphu.vn",
        lawType: { id: "3", name: "Nghị định"}
    },
    {
        id: "8",
        title: "Nghị định 169/2024/NĐ-CP",
        referenceNumber: "169/2024/NĐ-CP",
        issueDate: "2024-12-25",
        effectiveDate: "2025-03-01",
        dateline: "Quy định về hoạt động kinh doanh vận tải bằng xe ô tô",
        filePath: "/docs/Nghi_dinh_169-2024-ND-CP.pdf",
        sourceUrl: "https://vanban.chinhphu.vn",
        lawType: { id: "3", name: "Nghị định"}
    },
    {
        id: "9",
        title: "Thông tư 635/2024/TT-BGTVT",
        referenceNumber: "635/2024/TT-BGTVT",
        issueDate: "2024-12-10",
        effectiveDate: "2025-02-01",
        dateline: "Thông tư quy định về kiểm định an toàn kỹ thuật và bảo vệ môi trường phương tiện giao thông đường bộ",
        filePath: "/docs/Thongtuc635,2024-TT-BGTVT.pdf",
        sourceUrl: "https://bgtvt.gov.vn",
        lawType: { id: "2", name: "Thông tư" }
    },
    {
        id: "10",
        title: "Quyết định 123/2024/QĐ-TTg",
        referenceNumber: "123/2024/QĐ-TTg",
        issueDate: "2024-06-15",
        effectiveDate: "2024-07-01",
        dateline: "Quyết định về việc phê duyệt Chiến lược phát triển giao thông vận tải đường bộ",
        filePath: "/docs/Quyet_dinh_123_2024_QD-TTg.pdf",
        sourceUrl: "https://chinhphu.vn",
        lawType: { id: "4", name: "Quyết định" }
    }
];

const Badge = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <span
    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${className}`}
  >
    {children}
  </span>
);

export default function LawsPage() {
  const { user } = useAuth();
  const { laws, loading, getAllLaws } = useLawCrud();
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredLaws, setFilteredLaws] = useState<Law[]>([]);

  useEffect(() => {
    getAllLaws();
  }, [getAllLaws]);

  useEffect(() => {
    const filtered = laws.filter(
      (law) =>
        law.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        law.referenceNumber?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        law.lawType?.name?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredLaws(filtered);
  }, [laws, searchTerm]);

  const formatDate = (dateString?: string) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("vi-VN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getLawTypeColor = (typeName?: string) => {
    switch (typeName) {
      case "Luật":
        return `bg-[${Color.MainColor}]/10 dark:bg-[${Color.MainColor}]/20 text-[${Color.MainColor}]`;
      case "Thông tư":
        return "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200";
      case "Nghị định":
        return "bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200";
      case "Quyết định":
        return "bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-200";
      default:
        return "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200";
    }
  };

  const handleViewPDF = (filePath?: string) => {
    if (filePath) {
      const viewerUrl = `/pdf-viewer?url=${encodeURIComponent(filePath)}`;
      window.open(viewerUrl, "_blank");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
        <HeaderTop_C logedUser={user} />
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <Spinner_C />
            <p className="mt-4 text-gray-600 dark:text-gray-400">
              Đang tải dữ liệu luật...
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <HeaderTop_C logedUser={user} />
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Thư Viện Luật Giao Thông
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Khám phá và tìm hiểu các văn bản pháp luật về giao thông đường bộ
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 w-5 h-5" />
            <Input
              type="text"
              placeholder="Tìm kiếm theo tên luật, số hiệu hoặc loại văn bản..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`pl-10 pr-4 py-3 w-full border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:border-[${Color.MainColor}] focus:ring-2 focus:ring-[${Color.MainColor}]/20 transition-all duration-200 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400`}
            />
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
            <div className="flex items-center">
              <div
                className={`p-2 bg-[${Color.MainColor}]/10 dark:bg-[${Color.MainColor}]/20 rounded-lg`}
              >
                <FileText className={`w-6 h-6 text-[${Color.MainColor}]`} />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Tổng số văn bản
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {laws.length}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
                <Calendar className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Đã tìm thấy
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {filteredLaws.length}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-lg">
                <FileText className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Loại văn bản
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {new Set(laws.map((law) => law.lawType?.name)).size}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Laws Grid */}
        {filteredLaws.length === 0 ? (
          <div className="text-center py-12">
            <FileText className="w-16 h-16 text-gray-400 dark:text-gray-500 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              {searchTerm
                ? "Không tìm thấy văn bản phù hợp"
                : "Chưa có văn bản nào"}
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              {searchTerm
                ? "Thử thay đổi từ khóa tìm kiếm"
                : "Văn bản sẽ được hiển thị ở đây"}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredLaws.map((law) => (
              <div
                key={law.id}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 group hover:shadow-lg dark:hover:shadow-gray-900/20 transition-all duration-300 min-h-[320px] flex flex-col"
              >
                <div className="p-6 flex flex-col flex-1">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <Badge
                      className={`${getLawTypeColor(
                        law.lawType?.name
                      )} text-xs font-medium`}
                    >
                      {law.lawType?.name}
                    </Badge>
                    <span className="text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                      {law.referenceNumber}
                    </span>
                  </div>

                  {/* Title */}
                  <h3
                    className={`text-lg font-semibold text-gray-900 dark:text-white mb-3 line-clamp-3 group-hover:text-[${Color.MainColor}] transition-colors`}
                  >
                    {law.title}
                  </h3>

                  {/* Details */}
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                      <Calendar className="w-4 h-4 mr-2" />
                      <span>Ban hành: {formatDate(law.issueDate)}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                      <Calendar className="w-4 h-4 mr-2" />
                      <span>Có hiệu lực: {formatDate(law.effectiveDate)}</span>
                    </div>
                    {law.dateline && (
                      <div className="text-sm text-gray-600 dark:text-gray-400 italic">
                        {law.dateline}
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 pt-4 border-t border-gray-100 dark:border-gray-700 mt-auto">
                    {law.filePath && (
                      <Button
                        onClick={() => handleViewPDF(law.filePath)}
                        className={`flex-1 bg-[${Color.MainColor}] hover:bg-[${Color.MainColor}]/90 text-white text-sm py-2`}
                      >
                        <Download className="w-4 h-4 mr-2" />
                        Xem văn bản
                      </Button>
                    )}
                    {law.sourceUrl && (
                      <Button
                        onClick={() => window.open(law.sourceUrl, "_blank")}
                        variant="outline"
                        className="flex-1 text-sm py-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                      >
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Nguồn
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
