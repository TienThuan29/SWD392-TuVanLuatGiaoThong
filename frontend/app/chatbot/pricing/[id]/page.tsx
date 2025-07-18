"use client";

import Footer from "@/components/combination/Footer_C";
import Header_C from "@/components/combination/Header_C";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  FaCheckCircle,
  FaArrowLeft,
  FaShoppingCart,
  FaClock,
  FaUsers,
  FaStar,
} from "react-icons/fa";
import { useUsagePackageCrud } from "@/hooks/useUsagePackageCrud";
import { UsagePackage } from "@/models/UsagePackage";
import Spinner_C from "@/components/combination/Spinner_C";
import { useAuth } from "@/context/AuthContext";
import { useMomoPayment } from "@/hooks/useMomoPayment";
import { Color } from "@/configs/CssConstant";

export default function UsagePackageDetail() {
  const { user } = useAuth();
  const params = useParams();
  const router = useRouter();
  const { usagePackage, loading, getUsagePackageById } = useUsagePackageCrud();
  const [packageData, setPackageData] = useState<UsagePackage | null>(null);
  const {
    initiatePayment,
    isLoading: paymentLoading,
    error: paymentError,
  } = useMomoPayment();

  useEffect(() => {
    if (params.id) {
      getUsagePackageById(params.id as string);
    }
  }, [params.id, getUsagePackageById]);

  useEffect(() => {
    if (usagePackage) {
      setPackageData(usagePackage);
    }
  }, [usagePackage]);

  const handleBackToPricing = () => {
    router.push("/chatbot/pricing");
  };

  const handlePurchasePackage = async () => {
    if (!user || !packageData) {
      console.error("User or package data not available");
      return;
    }

    console.log("user ", user);
    console.log("Purchase package:", packageData);

    try {
      const paymentRequest = {
        amount: packageData.price || 0,
        userId: user.id || "",
        packageId: packageData.id || "",
      };

      const response = await initiatePayment(paymentRequest);

      if (response?.payUrl) {
        // Open payment URL in new tab
        window.open(response.payUrl, "_blank");
      } else {
        console.error("Failed to get payment URL");
      }
    } catch (error) {
      console.error("Payment initiation failed:", error);
    }
  };

  if (loading) {
    return (
      <>
        <Header_C logedUser={user} />
        <section className="bg-gray-50 py-16">
          <div className="max-w-4xl mx-auto px-6">
            <div className="flex justify-center items-center py-12">
              <div className="text-center">
                <Spinner_C size="lg" color={Color.MainColor} />
                <p className="mt-6 text-gray-600">Đang tải thông tin gói...</p>
              </div>
            </div>
          </div>
        </section>
        <Footer />
      </>
    );
  }

  if (!packageData) {
    return (
      <>
        <Header_C logedUser={user} />
        <section className="bg-gray-50 py-16">
          <div className="max-w-4xl mx-auto px-6">
            <div className="text-center py-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Không tìm thấy gói
              </h2>
              <p className="text-gray-600 mb-6">
                Gói sử dụng bạn đang tìm kiếm không tồn tại hoặc đã bị xóa.
              </p>
              <button
                onClick={handleBackToPricing}
                className="inline-flex items-center gap-2 px-6 py-3 text-white rounded-lg transition-colors"
                style={{ backgroundColor: Color.MainColor }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor = "#0056b3")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = Color.MainColor)
                }
              >
                <FaArrowLeft />
                Quay lại trang gói
              </button>
            </div>
          </div>
        </section>
        <Footer />
      </>
    );
  }

  // Split description by "." and filter out empty strings
  const descriptions = packageData.description
    ? packageData.description
        .split(".")
        .map((desc) => desc.trim())
        .filter((desc) => desc.length > 0)
    : ["Truy cập AI chatbot", "Hỗ trợ tìm kiếm thông tin luật giao thông"];

  return (
    <>
      <Header_C />
      <section className="bg-gray-50 py-16">
        <div className="max-w-4xl mx-auto px-6">
          {/* Back Button */}
          <div className="mb-8">
            <button
              onClick={handleBackToPricing}
              className="cursor-pointer inline-flex items-center gap-2 transition-colors"
              style={{ color: Color.MainColor }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#0056b3")}
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = Color.MainColor)
              }
            >
              <FaArrowLeft />
              Quay lại trang gói
            </button>
          </div>

          {/* Package Header */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  {packageData.name}
                </h1>
                <p className="text-gray-600 text-lg">
                  Gói sử dụng AI chatbot hỗ trợ tìm kiếm thông tin luật giao
                  thông
                </p>
              </div>
              <div className="mt-4 lg:mt-0">
                <div className="text-right">
                  <div
                    className="text-4xl font-bold"
                    style={{ color: Color.MainColor }}
                  >
                    {packageData.price?.toLocaleString("vi-VN")}
                  </div>
                  <div className="text-gray-600">VNĐ / tháng</div>
                </div>
              </div>
            </div>

            {/* Package Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div
                className="flex items-center gap-3 p-4 rounded-lg"
                style={{ backgroundColor: `${Color.MainColor}20` }}
              >
                <FaClock
                  className="text-xl"
                  style={{ color: Color.MainColor }}
                />
                <div>
                  <div className="font-semibold text-gray-900">
                    {packageData.dailyLimit}
                  </div>
                  <div className="text-sm text-gray-600">
                    Lượt truy vấn/ngày
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-green-50 rounded-lg">
                <FaUsers className="text-green-600 text-xl" />
                <div>
                  <div className="font-semibold text-gray-900">
                    {packageData.daysLimit}
                  </div>
                  <div className="text-sm text-gray-600">Ngày có hiệu lực</div>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-purple-50 rounded-lg">
                <FaStar className="text-purple-600 text-xl" />
                <div>
                  <div className="font-semibold text-gray-900">Premium</div>
                  <div className="text-sm text-gray-600">Hỗ trợ ưu tiên</div>
                </div>
              </div>
            </div>

            {/* Features */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Tính năng bao gồm
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {descriptions.map((desc, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <FaCheckCircle className="text-green-500 mt-1 flex-shrink-0" />
                    <span className="text-gray-700">{desc}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Payment Error Display */}
            {paymentError && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-600 text-sm">{paymentError}</p>
              </div>
            )}

            {/* Purchase Button */}
            <div className="text-center">
              <button
                onClick={handlePurchasePackage}
                disabled={paymentLoading}
                className={`cursor-pointer inline-flex items-center gap-3 px-8 py-4 text-lg font-semibold rounded-lg transition-colors shadow-lg hover:shadow-xl ${
                  paymentLoading
                    ? "bg-gray-400 text-white cursor-not-allowed"
                    : "text-white"
                }`}
                style={
                  !paymentLoading ? { backgroundColor: Color.MainColor } : {}
                }
                onMouseEnter={
                  !paymentLoading
                    ? (e) => (e.currentTarget.style.backgroundColor = "#0056b3")
                    : undefined
                }
                onMouseLeave={
                  !paymentLoading
                    ? (e) =>
                        (e.currentTarget.style.backgroundColor =
                          Color.MainColor)
                    : undefined
                }
              >
                {paymentLoading ? (
                  <>
                    <Spinner_C size="sm" color="white" />
                    Đang xử lý...
                  </>
                ) : (
                  <>
                    <FaShoppingCart />
                    Mua gói ngay
                  </>
                )}
              </button>
              <p className="text-sm text-gray-500 mt-3">
                Dùng thử miễn phí trong 7 ngày. Hủy bất cứ lúc nào.
              </p>
            </div>
          </div>

          {/* Additional Information */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* What's Included */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Bao gồm những gì?
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <FaCheckCircle className="text-green-500 mt-1 flex-shrink-0" />
                  <span className="text-gray-700">
                    Truy cập không giới hạn AI chatbot
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <FaCheckCircle className="text-green-500 mt-1 flex-shrink-0" />
                  <span className="text-gray-700">
                    Hỗ trợ tìm kiếm thông tin luật giao thông
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <FaCheckCircle className="text-green-500 mt-1 flex-shrink-0" />
                  <span className="text-gray-700">Cập nhật luật mới nhất</span>
                </li>
                <li className="flex items-start gap-3">
                  <FaCheckCircle className="text-green-500 mt-1 flex-shrink-0" />
                  <span className="text-gray-700">Hỗ trợ khách hàng 24/7</span>
                </li>
              </ul>
            </div>

            {/* FAQ */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Câu hỏi thường gặp
              </h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">
                    Có thể hủy gói bất cứ lúc nào không?
                  </h4>
                  <p className="text-gray-600 text-sm">
                    Có, bạn có thể hủy gói bất cứ lúc nào mà không bị phạt phí.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">
                    Gói có hiệu lực ngay lập tức không?
                  </h4>
                  <p className="text-gray-600 text-sm">
                    Có, gói sẽ có hiệu lực ngay sau khi thanh toán thành công.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">
                    Có thể nâng cấp gói không?
                  </h4>
                  <p className="text-gray-600 text-sm">
                    Có, bạn có thể nâng cấp gói bất cứ lúc nào và chỉ trả tiền
                    chênh lệch.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
