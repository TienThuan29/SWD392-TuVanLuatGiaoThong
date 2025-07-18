'use client';

import { FaFacebookF, FaLinkedinIn, FaYoutube, FaInstagram } from 'react-icons/fa';
import { HiCheck } from 'react-icons/hi';
import Image from 'next/image';
import { Color } from '@/configs/CssConstant';

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 text-sm text-gray-700 dark:text-gray-300 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 py-10">
        {/* Contact */}
        <div className="text-center mb-6">
          <p className="font-semibold text-lg">
            Nếu bạn có câu hỏi? Gọi ngay{' '}
            <a style={{ color: Color.MainColor }} href="tel:1-888-858-2546">1-888-858-2546</a> hoặc email{' '}
            <a style={{ color: Color.MainColor }} href="mailto:sales@clio.com">tuvanluat@gmail.com.vn</a>
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Nhóm của chúng tôi làm việc từ Thứ Hai đến Thứ Sáu, từ 8 giờ sáng đến 8 giờ tối theo giờ EST.</p>
        </div>

        {/* Grid */}
        {/* <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8 text-sm">
          {[
            { title: 'Products', items: ['Clio Complete', 'Clio Manage', 'Clio Grow', 'Clio Accounting', 'Clio for Clients', 'Clio Draft', 'Integrations'] },
            { title: 'Features', items: ['Client Intake', 'Billing & Collections', 'Case Management', 'Document Management', 'Task Management', 'What’s New', 'See All Features'] },
            { title: 'Resources & Events', items: ['All Upcoming Events', 'Customer Stories', 'Clio Cloud Conference', 'Legal Trends Report', 'The Legal Insider Magazine', 'Compare Clio', 'Blog', 'Clio Reviews'] },
            { title: 'Community', items: ['Customer Community', 'Bar Associations', 'Incubator Program', 'Referrals', 'Academic Access', 'Channel Partner Program'] },
            { title: 'Support', items: ['Help Center', 'Data Migration', 'Developer Hub', 'Find a Consultant', 'Clio Academy', 'Sitemap', 'Subscribe', 'Contact Us'] }
          ].map((col) => (
            <div key={col.title}>
              <h4 className="font-semibold mb-2 text-gray-900 dark:text-gray-100">{col.title}</h4>
              <ul className="space-y-1">
                {col.items.map((item) => (
                  <li key={item}>
                    <a href="#" className="hover:underline text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 transition-colors duration-200">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div> */}

        {/* Bottom Section */}
        <div className="text-center mt-10 space-y-2">
          <p className="text-xs text-gray-500 dark:text-gray-400 font-semibold tracking-widest">CHUYỂN ĐỔI TRẢI NGHIỆM PHÁP LÝ CHO TẤT CẢ MỌI NGƯỜI</p>
          <div className="flex justify-center gap-4 text-xs text-gray-600 dark:text-gray-400">
            {['Về Chúng Tôi', 'Sứ Mệnh Của Chúng Tôi', 'Ban Lãnh Đạo', 'Tuyển Dụng', 'Tin Tức & Báo Chí'].map((item) => (
              <span key={item}>
                <a href="#" className="hover:underline hover:text-gray-900 dark:hover:text-gray-200 transition-colors duration-200">{item}</a>
              </span>
            ))}
          </div>
          <div className="flex justify-center items-center gap-2 mt-4">
            <HiCheck className="w-8 h-8 border-2 rounded-full p-1" style={{ color: Color.MainColor, borderColor: Color.MainColor }} />
            <span className="text-xl font-bold" style={{ color: Color.MainColor }}>Tư Vấn Luật Giao Thông Việt Nam</span>
          </div>

          {/* Social Icons */}
          <div className="flex justify-center gap-4 mt-4" style={{ color: Color.MainColor }}>
            <FaFacebookF className="hover:text-gray-600 dark:hover:text-gray-400 cursor-pointer transition-colors duration-200" />
            <FaLinkedinIn className="hover:text-gray-600 dark:hover:text-gray-400 cursor-pointer transition-colors duration-200" />
            <FaYoutube className="hover:text-gray-600 dark:hover:text-gray-400 cursor-pointer transition-colors duration-200" />
            <FaInstagram className="hover:text-gray-600 dark:hover:text-gray-400 cursor-pointer transition-colors duration-200" />
          </div>

          <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">© 2008 - 2025 Themis Solutions Inc. (Clio) | 300 - 4611 Canada Way, Burnaby, BC V5G 4X3</p>
        </div>
      </div>

      <div className="text-center text-xs py-4 border-t border-gray-100 dark:border-gray-700 text-gray-500 dark:text-gray-400 transition-colors duration-300">
        {['Điều khoản Dịch vụ', 'Dịch vụ Pháp lý', 'Trung tâm Tin cậy', 'Chính sách Bảo mật', 'Cookie', 'GDPR', 'Khả năng Tiếp cận', 'Nguyên tắc AI', 'Khu vực'].map((item, idx) => (
          <span key={item}>
            <a href="#" className="hover:underline hover:text-gray-700 dark:hover:text-gray-200 transition-colors duration-200">{item}</a>
            {idx < 8 && ' • '}
          </span>
        ))}
      </div>
    </footer>
  );
}
// This code defines a footer component for a web application using React and Next.js.