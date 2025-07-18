'use client';

import { HiCheck, HiShieldCheck, HiLightningBolt, HiChatAlt2, HiDocumentText, HiStar, HiUsers } from 'react-icons/hi';
import Header_C from '@/components/combination/Header_C';
import Footer_C from '@/components/combination/Footer_C';
import { Color } from '@/configs/CssConstant';
import { useAuth } from '@/context/AuthContext';
import { ThemeToggle_C } from '@/components/ui/ThemeToggle_C';

export default function AboutPage() {
  
  const { user } = useAuth();

  const features = [
    {
      icon: <HiChatAlt2 className="w-8 h-8" />,
      title: "Chatbot AI Thông Minh",
      description: "Trợ lý AI 24/7 hỗ trợ tư vấn luật giao thông với độ chính xác cao, phản hồi nhanh chóng và dễ sử dụng.",
      color: `bg-blue-100 dark:bg-blue-900` // Updated for dark mode
    },
    {
      icon: <HiStar className="w-8 h-8" />,
      title: "Tính Năng Premium",
      description: "Truy cập không giới hạn, tư vấn chuyên sâu, và các tính năng nâng cao dành cho người dùng cao cấp.",
      color: "bg-yellow-100 dark:bg-yellow-900 text-yellow-600 dark:text-yellow-400"
    },
    {
      icon: <HiDocumentText className="w-8 h-8" />,
      title: "Văn Bản Pháp Luật Mới Nhất",
      description: "Cập nhật liên tục các văn bản pháp luật giao thông mới nhất từ Bộ GTVT và các cơ quan có thẩm quyền.",
      color: "bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400"
    },
    {
      icon: <HiShieldCheck className="w-8 h-8" />,
      title: "Độ Tin Cậy Cao",
      description: "Thông tin pháp lý được kiểm chứng từ các nguồn chính thống, đảm bảo tính chính xác và cập nhật.",
      color: "bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-400"
    }
  ];

  const stats = [
    { number: "10,000+", label: "Người dùng tin tưởng" },
    { number: "50,000+", label: "Câu hỏi được trả lời" },
    { number: "100+", label: "Văn bản pháp luật" },
    { number: "24/7", label: "Hỗ trợ khách hàng" }
  ];

  const testimonials = [
    {
      name: "Nguyễn Văn A",
      role: "Tài xế taxi",
      content: "Website này giúp tôi hiểu rõ các quy định giao thông và tránh được nhiều vi phạm không đáng có.",
      rating: 5
    },
    {
      name: "Trần Thị B",
      role: "Sinh viên luật",
      content: "Tài liệu pháp luật được cập nhật thường xuyên, rất hữu ích cho việc học tập và nghiên cứu.",
      rating: 5
    },
    {
      name: "Lê Văn C",
      role: "Doanh nghiệp vận tải",
      content: "Chatbot AI trả lời nhanh và chính xác, giúp công ty chúng tôi tuân thủ đúng quy định pháp luật.",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      {/* Theme Toggle - Fixed position */}
      <div className="fixed top-4 right-4 z-50">
        <ThemeToggle_C />
      </div>

      {/* Header */}
      <Header_C logedUser={user} />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700 dark:from-blue-700 dark:via-blue-800 dark:to-blue-900 text-white py-24 overflow-hidden" style={{ background: `linear-gradient(135deg, ${Color.MainColor} 0%, #005bb5 50%, #004a94 100%)` }}>
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent"></div>
        </div>
        
        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-white/10 dark:bg-white/5 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-32 h-32 rounded-full blur-xl animate-pulse" style={{ backgroundColor: `${Color.MainColor}20` }}></div>
        <div className="absolute bottom-20 left-1/4 w-16 h-16 bg-white/10 dark:bg-white/5 rounded-full blur-xl animate-pulse"></div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center gap-2 bg-white/10 dark:bg-white/5 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
                <HiShieldCheck className="w-5 h-5" />
                <span className="text-sm font-medium">Đáng tin cậy • Chính xác • Cập nhật</span>
              </div>
              
              <h1 className="text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Giới Thiệu Về
                <span className="block bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">Website</span>
              </h1>
              
              <p className="text-xl mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                Nền tảng tư vấn luật giao thông Việt Nam hàng đầu, cung cấp thông tin pháp lý chính xác và dịch vụ tư vấn thông minh 24/7
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <a 
                  href="/chatbot"
                  className="px-8 py-4 bg-white dark:bg-gray-100 font-semibold rounded-lg hover:bg-gray-100 dark:hover:bg-gray-200 transition-all duration-300 transform hover:scale-105 shadow-lg"
                  style={{ color: Color.MainColor }}
                >
                  <div className="flex items-center gap-2">
                    <HiChatAlt2 className="w-5 h-5" />
                    Trải Nghiệm Chatbot
                  </div>
                </a>
                <a 
                  href="#features"
                  className="px-8 py-4 border-2 border-white text-white font-semibold rounded-lg hover:bg-white dark:hover:bg-gray-100 transition-all duration-300 transform hover:scale-105"
                  style={{ '--hover-text-color': Color.MainColor } as React.CSSProperties}
                >
                  <div className="flex items-center gap-2">
                    <HiLightningBolt className="w-5 h-5" />
                    Khám Phá Tính Năng
                  </div>
                </a>
              </div>
              
              {/* Stats Preview */}
              <div className="grid grid-cols-3 gap-6 mt-12 pt-8 border-t border-white/20">
                <div className="text-center">
                  <div className="text-2xl font-bold">10,000+</div>
                  <div className="text-sm opacity-80">Người dùng</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">50,000+</div>
                  <div className="text-sm opacity-80">Câu hỏi</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">24/7</div>
                  <div className="text-sm opacity-80">Hỗ trợ</div>
                </div>
              </div>
            </div>
            
            {/* Banner Image & Content */}
            <div className="relative">
              {/* Main Banner Card */}
              <div className="relative bg-white/10 dark:bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/20 dark:border-white/10 shadow-2xl">
                {/* Background Image */}
                <div className="absolute inset-0 rounded-2xl overflow-hidden opacity-20">
                  <div className="w-full h-full" style={{ background: `linear-gradient(135deg, ${Color.MainColor} 0%, #8b5cf6 100%)` }}></div>
                </div>
                
                <div className="relative z-10">
                  <div className="flex items-center justify-center mb-6">
                    <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg">
                      <HiShieldCheck className="w-10 h-10 text-white" />
                    </div>
                  </div>
                  
                  <h3 className="text-2xl font-bold text-center mb-4">Tư Vấn Luật Giao Thông</h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 p-3 bg-white/10 dark:bg-white/5 rounded-lg backdrop-blur-sm">
                      <HiCheck className="w-5 h-5 text-green-400" />
                      <span className="text-sm font-medium">AI Chatbot thông minh</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-white/10 dark:bg-white/5 rounded-lg backdrop-blur-sm">
                      <HiCheck className="w-5 h-5 text-green-400" />
                      <span className="text-sm font-medium">Văn bản pháp luật mới nhất</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-white/10 dark:bg-white/5 rounded-lg backdrop-blur-sm">
                      <HiCheck className="w-5 h-5 text-green-400" />
                      <span className="text-sm font-medium">Tư vấn chuyên nghiệp 24/7</span>
                    </div>
                  </div>
                  
                  <div className="mt-6 text-center">
                    <div className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg">
                      <HiStar className="w-4 h-4" />
                      Nền tảng số 1 Việt Nam
                    </div>
                  </div>
                </div>
                
                {/* Decorative Elements */}
                <div className="absolute -top-4 -right-4 w-8 h-8 bg-yellow-400 rounded-full opacity-60 animate-pulse"></div>
                <div className="absolute -bottom-4 -left-4 w-6 h-6 rounded-full opacity-60 animate-pulse" style={{ backgroundColor: Color.MainColor }}></div>
                <div className="absolute top-1/2 -left-2 w-4 h-4 bg-green-400 rounded-full opacity-60 animate-pulse"></div>
              </div>
              
              {/* Floating Icons */}
              <div className="absolute -top-8 -right-8 w-16 h-16 bg-white/20 dark:bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm">
                <HiDocumentText className="w-8 h-8 text-white" />
              </div>
              <div className="absolute -bottom-8 -left-8 w-12 h-12 bg-white/20 dark:bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm">
                <HiChatAlt2 className="w-6 h-6 text-white" />
              </div>
              
              {/* Additional Floating Elements */}
              <div className="absolute top-1/2 -right-4 w-8 h-8 bg-green-400/60 rounded-full animate-bounce"></div>
              <div className="absolute bottom-1/4 -right-2 w-6 h-6 bg-purple-400/60 rounded-full animate-bounce" style={{ animationDelay: '0.5s' }}></div>
            </div>
          </div>
        </div>
        
        {/* Bottom Wave Effect */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg className="w-full h-16" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25" className="fill-white dark:fill-gray-900"></path>
            <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5" className="fill-white dark:fill-gray-900"></path>
            <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" className="fill-white dark:fill-gray-900"></path>
          </svg>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 bg-white dark:bg-gray-900 transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white" style={{ color: Color.MainColor }}>
                Sứ Mệnh Của Chúng Tôi
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                Chúng tôi cam kết cung cấp thông tin pháp lý giao thông chính xác, dễ hiểu và cập nhật, 
                giúp người dân Việt Nam tuân thủ đúng quy định pháp luật và tham gia giao thông an toàn.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <HiCheck className="w-6 h-6 text-green-500" />
                  <span className="text-gray-700 dark:text-gray-300">Thông tin pháp lý chính xác và cập nhật</span>
                </div>
                <div className="flex items-center gap-3">
                  <HiCheck className="w-6 h-6 text-green-500" />
                  <span className="text-gray-700 dark:text-gray-300">Dịch vụ tư vấn 24/7 với AI thông minh</span>
                </div>
                <div className="flex items-center gap-3">
                  <HiCheck className="w-6 h-6 text-green-500" />
                  <span className="text-gray-700 dark:text-gray-300">Giao diện thân thiện, dễ sử dụng</span>
                </div>
              </div>
            </div>
            <div className="p-8 rounded-2xl bg-blue-50 dark:bg-blue-900/20 transition-colors duration-200" style={{ background: `linear-gradient(135deg, ${Color.MainColor}10 0%, ${Color.MainColor}20 100%)` }}>
              <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white" style={{ color: Color.MainColor }}>
                Tầm Nhìn
              </h3>
              <p className="text-gray-700 dark:text-gray-300">
                Trở thành nền tảng tư vấn luật giao thông số 1 tại Việt Nam, 
                góp phần nâng cao ý thức chấp hành luật giao thông và giảm thiểu tai nạn giao thông.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 bg-gray-50 dark:bg-gray-800 transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white" style={{ color: Color.MainColor }}>
              Tính Năng Nổi Bật
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Khám phá những tính năng độc đáo giúp website của chúng tôi trở thành lựa chọn hàng đầu 
              cho việc tư vấn luật giao thông tại Việt Nam
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white dark:bg-gray-700 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200">
                <div className={`w-16 h-16 rounded-lg flex items-center justify-center mb-4 ${feature.color}`} style={feature.color.includes('blue') ? { backgroundColor: `${Color.MainColor}20`, color: Color.MainColor } : {}}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white dark:bg-gray-900 transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-bold mb-2" style={{ color: Color.MainColor }}>
                  {stat.number}
                </div>
                <div className="text-gray-600 dark:text-gray-300">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-white dark:bg-gray-900 transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white" style={{ color: Color.MainColor }}>
              Tại Sao Chọn Chúng Tôi
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: `${Color.MainColor}20` }}>
                <HiLightningBolt className="w-8 h-8" style={{ color: Color.MainColor }} />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">Nhanh Chóng</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Trả lời tức thì với công nghệ AI tiên tiến, tiết kiệm thời gian của bạn
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <HiShieldCheck className="w-8 h-8 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">Đáng Tin Cậy</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Thông tin được kiểm chứng từ các nguồn chính thống và cập nhật thường xuyên
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <HiUsers className="w-8 h-8 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">Thân Thiện</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Giao diện dễ sử dụng, phù hợp với mọi đối tượng người dùng
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 text-white" style={{ backgroundColor: Color.MainColor }}>
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Sẵn Sàng Trải Nghiệm?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Bắt đầu sử dụng chatbot AI thông minh của chúng tôi ngay hôm nay để nhận tư vấn luật giao thông miễn phí
          </p>
          <div className="flex justify-center gap-4">
            <a 
              href="/chatbot"
              className="px-8 py-3 bg-white dark:bg-gray-100 font-semibold rounded-lg hover:bg-gray-100 dark:hover:bg-gray-200 transition"
              style={{ color: Color.MainColor }}
            >
              Trải Nghiệm Miễn Phí
            </a>
            <a 
              href="/chatbot/pricing"
              className="px-8 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white dark:hover:bg-gray-100 transition"
              style={{ '--hover-text-color': Color.MainColor } as React.CSSProperties}
            >
              Nâng Cấp Premium
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer_C />
    </div>
  );
}