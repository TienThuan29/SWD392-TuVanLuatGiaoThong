"use client";

import Footer from "@/components/combination/Footer_C";
import Header_C from "@/components/combination/Header_C";
import { useState } from "react";
import { FaCheckCircle } from "react-icons/fa";

const plans = [
  {
    id: "basic-001",
    name: "Basic Plan",
    descriptions: [
      "Access to core features",
      "Email support",
      "Basic traffic law queries",
      "Limited daily usage"
    ],
    price: 9.99,
    daily_limit: 10,
    days_limit: 30,
    is_deleted: false,
    created_date: new Date("2024-01-01"),
    updated_date: new Date("2024-01-10"),
    button: { text: "Try for Free", type: "primary" },
    badge: null,
  },
  {
    id: "pro-002",
    name: "Pro Plan",
    descriptions: [
      "Priority support",
      "Increased daily usage",
      "Advanced traffic law analysis",
      "Document generation"
    ],
    price: 29.99,
    daily_limit: 100,
    days_limit: 90,
    is_deleted: false,
    created_date: new Date("2024-02-15"),
    updated_date: new Date("2024-03-01"),
    button: { text: "Try for Free", type: "primary" },
    badge: "Popular",
  },
  {
    id: "premium-003",
    name: "Premium Plan",
    descriptions: [
      "Unlimited queries",
      "24/7 priority support",
      "Full traffic law coverage",
      "Custom document templates",
      "API access"
    ],
    price: 49.99,
    daily_limit: 1000,
    days_limit: 365,
    is_deleted: false,
    created_date: new Date("2024-03-10"),
    updated_date: new Date("2024-03-20"),
    button: { text: "Book a Demo", type: "secondary" },
    badge: "Best Value",
  },
  {
    id: "premium-004",
    name: "Premium Plan",
    descriptions: [
      "Unlimited queries",
      "24/7 priority support",
      "Full traffic law coverage",
      "Custom document templates",
      "API access"
    ],
    price: 49.99,
    daily_limit: 1000,
    days_limit: 365,
    is_deleted: false,
    created_date: new Date("2024-03-10"),
    updated_date: new Date("2024-03-20"),
    button: { text: "Book a Demo", type: "secondary" },
    badge: "Best Value",
  }
];

function Pricing() {
  const [isAnnual, setIsAnnual] = useState(true);

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
                  ${price}
                </span>
                <span className="text-sm text-gray-700"> VNĐ / month</span>
              </div>

              {/* Title */}
              <h3 className="font-semibold text-lg text-[#0069d1] mb-2">{name}</h3>
              
              {/* Usage Limits */}
              <div className="text-sm text-gray-700 mb-4">
                <p>Daily Limit: {daily_limit} queries</p>
                <p>Valid for: {days_limit} days</p>
              </div>

              {/* Features */}
              <div className="border-t border-gray-200 pt-4 mb-6 flex-grow">
                <h4 className="font-semibold mb-3 text-gray-900">Features</h4>
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
                className={`w-full rounded-full py-3 text-white font-semibold transition ${button.type === "primary"
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
  return (
    <>
      <Header_C />
      <Pricing />
      <Footer />
    </>
  )
}
