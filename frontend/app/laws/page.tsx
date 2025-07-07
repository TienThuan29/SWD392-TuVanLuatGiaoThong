"use client";

import { useEffect, useState } from "react";
import { useLawCrud } from "@/hooks/useLawCrud";
import { Law } from "@/models/Law";
import Card_C from "@/components/combination/Card_C";
import Spinner_C from "@/components/combination/Spinner_C";
import { Button } from "@/components/modern-ui/button";
import { Input } from "@/components/modern-ui/input";
import { Calendar, FileText, ExternalLink, Download, Search, Filter, Eye } from "lucide-react";
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

// Simple Badge component since it doesn't exist in modern-ui
const Badge = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${className}`}>
        {children}
    </span>
);

export default function LawsPage() {
    const { user } = useAuth();
    const { laws, loading, getAllLaws } = useLawCrud();
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredLaws, setFilteredLaws] = useState<Law[]>([]);
    const [selectedCategory, setSelectedCategory] = useState("all");

    // Combine real laws with sample data for demo
    const allLaws = [...laws, ...sampleLaws];

    useEffect(() => {
        getAllLaws();
    }, [getAllLaws]);

    useEffect(() => {
        let filtered = allLaws.filter(law => 
            law.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            law.referenceNumber?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            law.lawType?.name?.toLowerCase().includes(searchTerm.toLowerCase())
        );

        // Filter by category
        if (selectedCategory !== "all") {
            filtered = filtered.filter(law => law.lawType?.name === selectedCategory);
        }

        setFilteredLaws(filtered);
    }, [allLaws, searchTerm, selectedCategory]);

    const formatDate = (dateString?: string) => {
        if (!dateString) return "N/A";
        return new Date(dateString).toLocaleDateString("vi-VN", {
            year: "numeric",
            month: "long",
            day: "numeric"
        });
    };

    const getLawTypeColor = (typeName?: string) => {
        switch (typeName) {
            case "Luật":
                return `bg-[${Color.MainColor}]/10 text-[${Color.MainColor}]`;
            case "Thông tư":
                return "bg-green-100 text-green-800";
            case "Nghị định":
                return "bg-purple-100 text-purple-800";
            case "Quyết định":
                return "bg-orange-100 text-orange-800";
            default:
                return "bg-gray-100 text-gray-800";
        }
    };

    const handleViewPDF = (filePath?: string) => {
        if (filePath) {
            // For demo purposes, show alert if file doesn't exist
            if (filePath.startsWith('/docs/')) {
                alert('Đây là demo - File PDF sẽ được mở ở đây');
                return;
            }
            const viewerUrl = `/pdf-viewer?url=${encodeURIComponent(filePath)}`;
            window.open(viewerUrl, '_blank');
        }
    };

    const handleDownload = (filePath?: string, fileName?: string) => {
        if (filePath) {
            // For demo purposes, show alert if file doesn't exist
            if (filePath.startsWith('/docs/')) {
                alert('Đây là demo - File PDF sẽ được tải về');
                return;
            }
            const link = document.createElement('a');
            link.href = filePath;
            link.download = fileName || 'document.pdf';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    };

    // Group laws by type
    const groupedLaws = filteredLaws.reduce((acc, law) => {
        const type = law.lawType?.name || "Khác";
        if (!acc[type]) {
            acc[type] = [];
        }
        acc[type].push(law);
        return acc;
    }, {} as Record<string, Law[]>);

    // Get unique law types for filter
    const lawTypes = Array.from(new Set(allLaws.map(law => law.lawType?.name).filter(Boolean)));

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
                <HeaderTop_C logedUser={user} />
                <div className="flex items-center justify-center min-h-screen">
                    <div className="text-center">
                        <Spinner_C />
                        <p className="mt-4 text-gray-600">Đang tải dữ liệu luật...</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
            <HeaderTop_C logedUser={user} />
            <div className="container mx-auto px-4 py-8">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-gray-900 mb-2">
                        Kho Tài Liệu Luật Giao Thông Việt Nam
                    </h1>
                    <p className="text-lg text-gray-600">
                        Tổng hợp đầy đủ các văn bản pháp luật về giao thông đường bộ
                    </p>
                </div>

                {/* Search Bar */}
                <div className="max-w-2xl mx-auto mb-8">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <Input
                            type="text"
                            placeholder="Tìm kiếm theo tên luật, số hiệu hoặc loại văn bản..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className={`pl-10 pr-4 py-3 w-full border-2 border-gray-200 rounded-xl focus:border-[${Color.MainColor}] focus:ring-2 focus:ring-[${Color.MainColor}]/20 transition-all duration-200`}
                        />
                    </div>
                </div>

                {/* Filters and Stats */}
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8 gap-4">
                    {/* Category Filter */}
                    <div className="flex flex-wrap items-center gap-4">
                        <div className="flex items-center gap-2">
                            <Filter className="text-gray-600 w-5 h-5" />
                            <span className="text-gray-700 font-medium">Lọc theo danh mục:</span>
                        </div>
                        <select
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="all">Tất cả danh mục</option>
                            {lawTypes.map(type => (
                                <option key={type} value={type}>
                                    {type}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Stats */}
                    <div className="text-gray-600">
                        Tổng cộng: <span className="font-semibold text-blue-600">
                            {filteredLaws.length} tài liệu
                        </span>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                        <div className="flex items-center">
                            <div className={`p-2 bg-[${Color.MainColor}]/10 rounded-lg`}>
                                <FileText className={`w-6 h-6 text-[${Color.MainColor}]`} />
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-600">Tổng số văn bản</p>
                                <p className="text-2xl font-bold text-gray-900">{allLaws.length}</p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                        <div className="flex items-center">
                            <div className="p-2 bg-green-100 rounded-lg">
                                <Search className="w-6 h-6 text-green-600" />
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-600">Đã tìm thấy</p>
                                <p className="text-2xl font-bold text-gray-900">{filteredLaws.length}</p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                        <div className="flex items-center">
                            <div className="p-2 bg-purple-100 rounded-lg">
                                <FileText className="w-6 h-6 text-purple-600" />
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-600">Loại văn bản</p>
                                <p className="text-2xl font-bold text-gray-900">
                                    {lawTypes.length}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Document Categories */}
                {Object.keys(groupedLaws).length === 0 ? (
                    <div className="text-center py-12">
                        <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 mb-2">
                            {searchTerm ? "Không tìm thấy văn bản phù hợp" : "Chưa có văn bản nào"}
                        </h3>
                        <p className="text-gray-600">
                            {searchTerm ? "Thử thay đổi từ khóa tìm kiếm" : "Văn bản sẽ được hiển thị ở đây"}
                        </p>
                    </div>
                ) : (
                    <div className="space-y-12">
                        {Object.entries(groupedLaws).map(([type, typeLaws]) => (
                            <div key={type} className="bg-white rounded-xl shadow-lg overflow-hidden">
                                {/* Category Header */}
                                <div className="bg-gradient-to-r from-blue-50 to-blue-100 px-6 py-6 border-b">
                                    <h2 className="text-2xl font-bold text-gray-800 mb-2">
                                        {type}
                                    </h2>
                                    <p className="text-gray-600">
                                        Các văn bản pháp luật thuộc loại {type.toLowerCase()}
                                    </p>
                                    <div className="mt-3 text-sm text-blue-600 font-medium">
                                        {typeLaws.length} tài liệu
                                    </div>
                                </div>

                                {/* Documents Grid */}
                                <div className="p-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                        {typeLaws.map((law) => (
                                            <div
                                                key={law.id}
                                                className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow duration-300"
                                            >
                                                {/* Document Icon and Header */}
                                                <div className="flex items-start gap-4 mb-4">
                                                    <div className="flex-shrink-0">
                                                        <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                                                            <FileText className="text-red-600 text-2xl" />
                                                        </div>
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <div className="flex items-start justify-between mb-2">
                                                            <Badge className={`${getLawTypeColor(law.lawType?.name)} text-xs font-medium`}>
                                                                {law.lawType?.name}
                                                            </Badge>
                                                            <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                                                                {law.referenceNumber}
                                                            </span>
                                                        </div>
                                                        <h3 className="font-semibold text-gray-800 text-lg mb-2 line-clamp-2">
                                                            {law.title}
                                                        </h3>
                                                    </div>
                                                </div>

                                                {/* Document Info */}
                                                <div className="space-y-2 text-sm text-gray-500 mb-4">
                                                    <div className="flex justify-between">
                                                        <span>Ngày ban hành:</span>
                                                        <span className="font-medium">{formatDate(law.issueDate)}</span>
                                                    </div>
                                                    <div className="flex justify-between">
                                                        <span>Có hiệu lực:</span>
                                                        <span className="font-medium">{formatDate(law.effectiveDate)}</span>
                                                    </div>
                                                    {law.dateline && (
                                                        <div className="text-sm text-gray-600 italic mt-2">
                                                            {law.dateline}
                                                        </div>
                                                    )}
                                                </div>

                                                {/* Action Buttons */}
                                                <div className="flex gap-2">
                                                    {law.filePath && (
                                                        <button
                                                            onClick={() => handleViewPDF(law.filePath)}
                                                            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors duration-200"
                                                        >
                                                            <Eye className="w-4 h-4" />
                                                            <span className="font-medium">Xem</span>
                                                        </button>
                                                    )}
                                                    {law.filePath && (
                                                        <button
                                                            onClick={() => handleDownload(law.filePath, law.title)}
                                                            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition-colors duration-200"
                                                        >
                                                            <Download className="w-4 h-4" />
                                                            <span className="font-medium">Tải về</span>
                                                        </button>
                                                    )}
                                                    {law.sourceUrl && (
                                                        <button
                                                            onClick={() => window.open(law.sourceUrl, '_blank')}
                                                            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-gray-50 text-gray-600 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                                                        >
                                                            <ExternalLink className="w-4 h-4" />
                                                            <span className="font-medium">Nguồn</span>
                                                        </button>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
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
