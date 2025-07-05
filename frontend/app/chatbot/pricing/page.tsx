"use client";

import Footer from "@/components/combination/Footer_C";
import Header_C from "@/components/combination/Header_C";
import { useState, useEffect } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { useUsagePackageCrud } from "@/hooks/useUsagePackageCrud";
import { UsagePackage } from "@/models/UsagePackage";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

type PlanData = {
  id: string;
  name: string;
  descriptions: string[];
  price: number;
  daily_limit: number;
  days_limit: number;
  button: {
    text: string;
    type: "primary" | "secondary";
  };
  badge?: string;
};

function Pricing() {

  const router = useRouter();
  const { usagePackages, loading, getAllUsagePackages } = useUsagePackageCrud();
  const [plans, setPlans] = useState<PlanData[]>([]);

  useEffect(() => {
    getAllUsagePackages();
  }, [getAllUsagePackages]);

  useEffect(() => {
    if (usagePackages.length > 0) {
      const formattedPlans: PlanData[] = usagePackages
        .filter((pkg: UsagePackage) => !pkg.isDeleted)
        .map((pkg: UsagePackage, index: number) => {
          // Split description by "." and filter out empty strings
          const descriptions = pkg.description 
            ? pkg.description.split('.').map(desc => desc.trim()).filter(desc => desc.length > 0)
            : ["Truy cập AI chatbot", "Hỗ trợ tìm kiếm thông tin luật giao thông"];
          
          return {
            id: pkg.id || `plan-${index}`,
            name: pkg.name || "Gói cơ bản",
            descriptions: descriptions,
            price: pkg.price || 0,
            daily_limit: pkg.dailyLimit || 10,
            days_limit: pkg.daysLimit || 30,
            button: {
              text: "Chọn gói",
              type: index === 1 ? "primary" : "secondary"
            },
            badge: index === 1 ? "Popular" : undefined
          };
        });
      
      setPlans(formattedPlans);
    }
  }, [usagePackages]);

  const handleSelectPackage = (packageId: string) => {
    router.push(`/chatbot/pricing/${packageId}`);
  };

  if (loading) {
    return (
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-300 rounded mb-4"></div>
            <div className="h-4 bg-gray-300 rounded mb-8"></div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="bg-white rounded-xl shadow-lg p-6">
                  <div className="h-6 bg-gray-300 rounded mb-4"></div>
                  <div className="h-4 bg-gray-300 rounded mb-2"></div>
                  <div className="h-32 bg-gray-300 rounded mb-4"></div>
                  <div className="h-10 bg-gray-300 rounded"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-2xl md:text-3xl font-extrabold mb-2">
          Sử dụng không giới hạn AI chatbot hỗ trợ tìm kiếm thông tin về luật giao thông
        </h2>
        <p className="text-sm text-gray-700 mb-8">
          Dùng thử miễn phí trong 7 ngày. Hủy bất cứ lúc nào.
        </p>

        {/* Pricing cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {plans.map(({ id, name, descriptions, price, daily_limit, days_limit, button, badge }, i) => (
            <div
              key={id}
              className="bg-white rounded-xl shadow-lg flex flex-col p-6 relative"
            >
              {/* Badge */}
              {badge && (
                <div
                  className={`absolute top-4 right-4 text-xs font-semibold px-2 py-1 rounded-full ${badge === "Popular" ? "bg-[#0069d1] text-white" : "bg-green-700 text-white"
                    }`}
                >
                  {badge}
                </div>
              )}

              {/* Price */}
              <div className="mb-4">
                <span className="text-4xl font-extrabold text-[#0069d1]">
                  {price.toLocaleString('vi-VN')}
                </span>
                <span className="text-sm text-gray-700"> VNĐ / tháng</span>
              </div>

              {/* Title */}
              <h3 className="font-semibold text-lg text-[#0069d1] mb-2">{name}</h3>
              
              {/* Usage Limits */}
              <div className="text-sm text-gray-700 mb-4">
                <p>Giới hạn hàng ngày: {daily_limit} lượt truy vấn</p>
                <p>Có hiệu lực: {days_limit} ngày</p>
              </div>

              {/* Features */}
              <div className="border-t border-gray-200 pt-4 mb-6 flex-grow">
                <h4 className="font-semibold mb-3 text-gray-900">Tính năng</h4>
                <ul className="text-xs text-gray-700 space-y-2">
                  {descriptions.map((desc, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <FaCheckCircle className="text-[#0069d1] mt-[3px] flex-shrink-0" />
                      <span>{desc}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Button */}
              <button
                onClick={() => handleSelectPackage(id)}
                className={`cursor-pointer w-full rounded-full py-3 text-white font-semibold transition ${button.type === "primary"
                    ? "bg-[#0069d1] hover:bg-[#0069d1]"
                    : "bg-[#0069d1] hover:bg-[#0069d1]"
                  }`}
              >
                {button.text}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Page() {
  const { user } = useAuth();
  return (
    <>
      <Header_C logedUser={user} />
      <Pricing />
      <Footer />
    </>
  )
}
