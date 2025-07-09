import Image from "next/image";
import Link from "next/link";
import { FiClock } from "react-icons/fi";
import { FaFilePdf } from "react-icons/fa";
import { Color } from "@/configs/CssConstant";

export default function Banner_C() {
  const mainColorStyle = {
    "--main-color": Color.MainColor,
  } as React.CSSProperties;

  return (
    <div className="w-full bg-gray-50 dark:bg-gray-900 py-10 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row md:items-center md:justify-between gap-10">
        {/* Left content */}
        <div className="flex-1 max-w-2xl">
          <nav className="text-sm text-gray-500 dark:text-gray-400 mb-4">
            Trang chủ &gt; Bài viết &gt; 
          </nav>

          <h1 className="text-4xl font-extrabold text-maincolor mb-4 dark:text-blue-400">
            Tư Vấn Luật Giao Thông Việt Nam: <br/> Tư Vấn và Cập Nhật Mới Nhất
          </h1>

          <p className="mb-8 text-gray-700 dark:text-gray-300 text-sm flex items-center gap-2">
            Trích nguồn từ {" "}
            <Link
              href="https://thuvienphapluat.vn/phap-luat/ho-tro-phap-luat/luat-giao-thong-2025-va-cac-nghi-dinh-thong-tu-huong-dan-moi-nhat-luat-giao-thong-2025-gom-cac-luat-939767-198964.html"
              className="text-maincolor hover:underline dark:text-blue-400"
              target="_blank"
              rel="noopener noreferrer"
            >
              Thư viện pháp luật Việt Nam
            </Link>
            <FiClock className="inline w-4 h-4" />
          </p>

          <button
            className="inline-flex items-center gap-2 rounded-full px-6 py-2 text-lg font-semibold transition text-white hover:bg-[#005bb5] dark:hover:bg-[#004499] cursor-pointer"
            style={{ backgroundColor: Color.MainColor }}
          >
            <FaFilePdf className="w-5 h-5 text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 transition-all duration-300 ease-in-out" />
            Tải tài liệu luật giao thông Việt Nam
          </button> 
        </div>

        {/* Right content */}
        <div className="flex-1 max-w-md">
          <Image
            src="/bike-rm.png"
            alt="Article illustration"
            width={600}
            height={340}
            className="object-cover rounded-md"
            priority
          />
        </div>
      </div>
    </div>
  );
}
