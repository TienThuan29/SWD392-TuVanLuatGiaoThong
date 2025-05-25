"use client";

import Footer from "@/components/combination/Footer_C";
import Header_C from "@/components/combination/Header_C";
import { useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { Color } from "@/configs/CssConstant";

const plans = [
  {
    title: "EasyStart",
    priceAnnually: 49,
    priceMonthly: 5, // example monthly price for toggle
    desc: "Track your time and get paid.",
    features: [
      "Manage calendars, documents, and tasks in one place.",
      "Get paid faster by offering clients flexible online payment options.",
      "Accurately track time and bill for hourly, flat fee, or contingency matters.",
      "Work more efficiently with email and e-signature integrations.",
    ],
    button: { text: "Try for Free", type: "primary" },
    badge: null,
  },
  {
    title: "Essentials",
    priceAnnually: 89,
    priceMonthly: 9,
    desc: "Centralize the way you work and connect with clients.",
    features: [
      "Collaborate with clients through a secure portal and text message.",
      "Complete documents faster by auto-filling case data.",
      "Never miss a court deadline with automated scheduling and reminders.",
      "Connect your favorite tools with a library of over 250 integrations.",
    ],
    button: { text: "Try for Free", type: "primary" },
    badge: null,
  },
  {
    title: "Advanced",
    priceAnnually: 119,
    priceMonthly: 12,
    desc: "Maximize productivity and improve business intelligence.",
    features: [
      "Visualize case progress and gain insights on profitability.",
      "Automate key case management workflows.",
      "Never misplace a document with full document search.",
      "Help more clients with unlimited e-signatures.",
      "Access live onboarding and priority support.",
    ],
    button: { text: "Try for Free", type: "primary" },
    badge: "Popular",
  },
  {
    title: "Complete",
    priceAnnually: 149,
    priceMonthly: 15,
    desc: (
      <>
        Get everything you need to run your firm, including{" "}
        <a href="#" className="text-[#0069d1] underline">
          Clio Grow
        </a>
        .
      </>
    ),
    features: [
      "Simplify and oversee your client intake process from one central location.",
      "Automate appointment bookings, follow-up emails, and reminders.",
      "Collect accurate client information with online intake forms.",
      "Attract and win new clients with a professional website and Google Ads.",
    ],
    button: { text: "Book a Demo", type: "secondary" },
    badge: "Save over 16%",
  },
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
          Get started in minutes. Try it free for 7 days. Cancel anytime.
        </p>

        {/* Toggle Annual/Monthly */}
        <div className="inline-flex rounded-full border border-gray-300 overflow-hidden mb-12 text-sm font-medium">
          <button
            onClick={() => setIsAnnual(true)}
            className={`px-5 py-1.5 ${isAnnual ? "bg-[#0069d1] text-white" : "text-gray-700"
              }`}
          >
            Annually
          </button>
          <button
            onClick={() => setIsAnnual(false)}
            className={`px-5 py-1.5 ${!isAnnual ? "bg-[#0069d1] text-white" : "text-gray-700"
              }`}
          >
            Monthly
          </button>
        </div>

        {/* Pricing cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {plans.map(({ title, priceAnnually, priceMonthly, desc, features, button, badge }, i) => (
            <div
              key={i}
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
                  ${isAnnual ? priceAnnually : priceMonthly}
                </span>
                <span className="text-sm text-gray-700"> USD user / month</span>
              </div>

              {/* Title & Description */}
              <h3 className="font-semibold text-lg text-[#0069d1] mb-2">{title}</h3>
              <p className="text-xs text-gray-700 mb-6">{desc}</p>

              {/* Features */}
              <div className="border-t border-gray-200 pt-4 mb-6 flex-grow">
                <h4 className="font-semibold mb-3 text-gray-900">{
                  title === "EasyStart" ? "Features" :
                    title + " features plus:"
                }</h4>
                <ul className="text-xs text-gray-700 space-y-2">
                  {features.map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <FaCheckCircle className="text-[#0069d1] mt-[3px] flex-shrink-0" />
                      <span>{feat}</span>
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

              {/* Add-ons link */}
              <div className="mt-2 text-xs text-[#0069d1] cursor-pointer flex items-center justify-start gap-1 select-none">
                <span>↓ Add-ons available</span>
                <span className="border border-gray-400 rounded-full px-1 text-gray-500 text-xs leading-none font-bold select-none">?</span>
              </div>
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
