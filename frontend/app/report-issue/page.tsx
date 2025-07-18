"use client";

import React, { useState, useEffect } from 'react';
import { Input } from '@/components/modern-ui/input';
import { Select } from '@/components/modern-ui/select';
import { FaStar, FaUserSecret, FaUser, FaPaperPlane, FaSpinner } from 'react-icons/fa';
import { toast } from 'sonner';
import HeaderTop_C from '@/components/combination/HeaderTop_C';
import Footer_C from '@/components/combination/Footer_C';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

export default function ReviewPage() {
  const { user, isLoggedIn } = useAuth();
  const router = useRouter();

  // Sample data for demonstration
  const [reviews, setReviews] = useState([
    {
      id: "1",
      username: "legalexpert",
      fullname: "Nguyễn Văn A",
      avatarUrl: "https://randomuser.me/api/portraits/men/32.jpg",
      isAnonymous: false,
      content: "Trang web rất hữu ích cho việc tìm kiếm thông tin pháp luật giao thông. Giao diện thân thiện và dễ sử dụng.",
      rating: 5,
      createdDate: "2023-05-15T14:30:00Z",
      updatedDate: "2023-05-15T14:30:00Z"
    },
    {
      id: "2",
      username: "userlaw",
      fullname: "Trần Thị B",
      avatarUrl: "https://randomuser.me/api/portraits/women/44.jpg",
      isAnonymous: false,
      content: "Trang web tốt nhưng giao diện trên điện thoại cần cải thiện. Một số tính năng khó sử dụng trên mobile.",
      rating: 4,
      createdDate: "2023-05-10T09:15:00Z",
      updatedDate: "2023-05-12T11:20:00Z"
    },
    {
      id: "3",
      username: "anonymous_user",
      fullname: "Người dùng ẩn danh",
      avatarUrl: "https://ui-avatars.com/api/?name=Anonymous&background=6b7280&color=fff",
      isAnonymous: true,
      content: "Trang web có nhiều thông tin hữu ích. Tuy nhiên, tốc độ tải trang đôi khi chậm. Nhìn chung vẫn đáng sử dụng.",
      rating: 4,
      createdDate: "2023-05-08T16:45:00Z",
      updatedDate: "2023-05-08T16:45:00Z"
    }
  ]);

  const [formData, setFormData] = useState({
    isAnonymous: false,
    rating: 0,
    content: ''
  });

  const [sortBy, setSortBy] = useState('newest');
  const [filterBy, setFilterBy] = useState('all');
  const [loading, setLoading] = useState(false);
  const [showLoadMore, setShowLoadMore] = useState(true);

  // Star Rating Component
  interface StarRatingProps {
    rating: number;
    interactive?: boolean;
    onRatingChange?: (rating: number) => void;
  }

  const StarRating: React.FC<StarRatingProps> = ({ rating, interactive = false, onRatingChange }) => {
    const [hoveredRating, setHoveredRating] = useState(0);

    return (
      <div className="flex space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type={interactive ? "button" : undefined}
            className={`text-2xl transition-colors ${
              interactive ? 'cursor-pointer hover:scale-110' : 'cursor-default'
            } ${
              star <= (hoveredRating || rating) 
                ? 'text-yellow-400' 
                : 'text-gray-300 dark:text-gray-600'
            }`}
            onMouseEnter={() => interactive && setHoveredRating(star)}
            onMouseLeave={() => interactive && setHoveredRating(0)}
            onClick={() => interactive && onRatingChange && onRatingChange(star)}
          >
            <FaStar />
          </button>
        ))}
      </div>
    );
  };

  // Review Item Component
  const ReviewItem = ({ review }) => {
    const formatDate = (dateString) => {
      return new Date(dateString).toLocaleDateString('vi-VN', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    };

    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 transition-all duration-200 hover:shadow-md">
        <div className="flex items-start mb-4">
          {/* Avatar */}
          <div className="flex-shrink-0">
            {review.isAnonymous ? (
              <div className="w-12 h-12 rounded-full bg-gray-500 flex items-center justify-center text-white">
                <FaUserSecret className="text-xl" />
              </div>
            ) : review.avatarUrl ? (
              <img 
                src={review.avatarUrl} 
                alt={review.fullname} 
                className="w-12 h-12 rounded-full object-cover"
              />
            ) : (
              <div className="w-12 h-12 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                <FaUser className="text-xl" />
              </div>
            )}
          </div>

          {/* User Info */}
          <div className="ml-4 flex-1">
            <div className="flex items-center justify-between">
              <div>
                {review.isAnonymous ? (
                  <span className="font-medium text-gray-900 dark:text-white">Ẩn danh</span>
                ) : (
                  <div>
                    <span className="font-medium text-gray-900 dark:text-white">
                      {review.fullname}
                    </span>
                    {review.username && (
                      <span className="text-gray-500 dark:text-gray-400 text-sm ml-2">
                        @{review.username}
                      </span>
                    )}
                  </div>
                )}
                <div className="flex items-center mt-1">
                  <StarRating rating={review.rating} />
                  <span className="text-gray-500 dark:text-gray-400 text-sm ml-2">
                    {review.rating}/5
                  </span>
                </div>
              </div>
              <div className="text-right">
                <span className="text-gray-400 dark:text-gray-500 text-sm">
                  {formatDate(review.createdDate)}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Review Content */}
        <div className="text-gray-700 dark:text-gray-300 mb-4">
          {review.content}
        </div>

        {/* Edit Date */}
        {review.updatedDate && review.updatedDate !== review.createdDate && (
          <div className="text-xs text-gray-400 dark:text-gray-500 text-right">
            Cập nhật: {formatDate(review.updatedDate)}
          </div>
        )}
      </div>
    );
  };

  // Filter reviews based on rating
  const filterReviews = (reviewsToFilter, option) => {
    switch(option) {
      case 'all':
        return reviewsToFilter;
      case 'excellent':
        return reviewsToFilter.filter(review => review.rating === 5);
      case 'good':
        return reviewsToFilter.filter(review => review.rating === 4);
      case 'average':
        return reviewsToFilter.filter(review => review.rating === 3);
      case 'poor':
        return reviewsToFilter.filter(review => review.rating <= 2);
      case 'anonymous':
        return reviewsToFilter.filter(review => review.isAnonymous);
      case 'public':
        return reviewsToFilter.filter(review => !review.isAnonymous);
      default:
        return reviewsToFilter;
    }
  };

  // Sort reviews based on selected option
  const sortReviews = (reviewsToSort, option) => {
    switch(option) {
      case 'newest':
        return [...reviewsToSort].sort((a, b) => new Date(b.createdDate) - new Date(a.createdDate));
      case 'oldest':
        return [...reviewsToSort].sort((a, b) => new Date(a.createdDate) - new Date(b.createdDate));
      case 'highest':
        return [...reviewsToSort].sort((a, b) => b.rating - a.rating);
      case 'lowest':
        return [...reviewsToSort].sort((a, b) => a.rating - b.rating);
      case 'most_recent_update':
        return [...reviewsToSort].sort((a, b) => new Date(b.updatedDate) - new Date(a.updatedDate));
      case 'alphabetical':
        return [...reviewsToSort].sort((a, b) => {
          const nameA = a.isAnonymous ? 'Ẩn danh' : a.fullname;
          const nameB = b.isAnonymous ? 'Ẩn danh' : b.fullname;
          return nameA.localeCompare(nameB);
        });
      default:
        return reviewsToSort;
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.rating) {
      toast.error('Vui lòng chọn số sao đánh giá');
      return;
    }

    if (!formData.content.trim()) {
      toast.error('Vui lòng viết nội dung đánh giá');
      return;
    }

    // Generate anonymous avatar URL if needed
    const anonymousAvatarUrl = "https://ui-avatars.com/api/?name=Anonymous&background=6b7280&color=fff";

    const newReview = {
      // id sẽ được backend tự động tạo
      id: Date.now().toString(), // Temporary ID for demo
      // username, fullname, avatarUrl sẽ được backend tự động lấy từ user session
      username: formData.isAnonymous ? "anonymous_user" : "current_user",
      fullname: formData.isAnonymous ? "Người dùng ẩn danh" : "Người dùng hiện tại",
      avatarUrl: formData.isAnonymous ? anonymousAvatarUrl : "https://randomuser.me/api/portraits/lego/1.jpg",
      isAnonymous: formData.isAnonymous,
      content: formData.content,
      rating: formData.rating,
      createdDate: new Date().toISOString(),
      updatedDate: new Date().toISOString()
    };

    setReviews(prevReviews => [newReview, ...prevReviews]);
    setFormData({ isAnonymous: false, rating: 0, content: '' });
    toast.success('Đánh giá đã được gửi thành công!');
    
    // Scroll to reviews section
    setTimeout(() => {
      document.getElementById('reviewsContainer')?.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start' 
      });
    }, 100);
  };

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // Handle rating change
  const handleRatingChange = (rating) => {
    setFormData(prev => ({ ...prev, rating }));
  };

  // Load more reviews
  const loadMoreReviews = () => {
    setLoading(true);
    
    setTimeout(() => {
      const moreReviews = [
        {
          id: Date.now().toString(),
          username: "law_student",
          fullname: "Lê Văn C",
          avatarUrl: "https://randomuser.me/api/portraits/men/63.jpg",
          isAnonymous: false,
          content: "Là sinh viên luật, tôi thấy trang web này rất hữu ích cho việc học tập và nghiên cứu. Thông tin được cập nhật thường xuyên.",
          rating: 5,
          createdDate: "2023-04-28T10:20:00Z",
          updatedDate: "2023-04-28T10:20:00Z"
        },
        {
          id: (Date.now() + 1).toString(),
          username: "anonymous_user_2",
          fullname: "Người dùng ẩn danh",
          avatarUrl: "https://ui-avatars.com/api/?name=Anonymous&background=6b7280&color=fff",
          isAnonymous: true,
          content: "Trang web ổn, nhưng cần thêm tính năng tìm kiếm nâng cao. Một số thông tin còn khó tìm.",
          rating: 3,
          createdDate: "2023-04-25T15:45:00Z",
          updatedDate: "2023-04-25T15:45:00Z"
        }
      ];
      
      setReviews(prevReviews => [...prevReviews, ...moreReviews]);
      setLoading(false);
      
      if (reviews.length >= 8) {
        setShowLoadMore(false);
      }
    }, 1500);
  };

  // Get filtered and sorted reviews
  const filteredReviews = filterReviews(reviews, filterBy);
  const sortedReviews = sortReviews(filteredReviews, sortBy);

  // Calculate statistics
  const totalReviews = reviews.length;
  const averageRating = totalReviews > 0 ? (reviews.reduce((sum, review) => sum + review.rating, 0) / totalReviews).toFixed(1) : 0;
  const ratingDistribution = [5, 4, 3, 2, 1].map(star => 
    reviews.filter(review => review.rating === star).length
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      {/* Header Top Section */}
      <div className="sticky top-0 z-40 bg-white dark:bg-gray-800 border-b border-gray-200/50 dark:border-gray-700/50 shadow-sm transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4">
          <HeaderTop_C logedUser={user} />
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-indigo-700 dark:text-indigo-400 mb-2">
            Đánh giá trang web
          </h1>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Chia sẻ trải nghiệm của bạn về trang web tư vấn luật giao thông. 
            Đánh giá của bạn giúp chúng tôi cải thiện dịch vụ tốt hơn.
          </p>
          
          {/* Statistics */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">
              <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">{totalReviews}</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">Tổng đánh giá</div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">
              <div className="flex items-center justify-center">
                <div className="text-2xl font-bold text-yellow-500 mr-2">{averageRating}</div>
                <StarRating rating={Math.round(parseFloat(averageRating))} />
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-300">Đánh giá trung bình</div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">
              <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                {ratingDistribution[0] + ratingDistribution[1]}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-300">Đánh giá tích cực</div>
            </div>
          </div>
        </header>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Review Form */}
          <div className="lg:w-1/3">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 sticky top-24 transition-colors">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
                Viết đánh giá
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="isAnonymous"
                    name="isAnonymous"
                    checked={formData.isAnonymous}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 dark:border-gray-600 rounded"
                  />
                  <label htmlFor="isAnonymous" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                    Đánh giá ẩn danh
                  </label>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Đánh giá của bạn
                  </label>
                  <StarRating 
                    rating={formData.rating} 
                    interactive={true} 
                    onRatingChange={handleRatingChange}
                  />
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    {formData.rating === 0 && "Chọn số sao đánh giá"}
                    {formData.rating === 1 && "Rất kém"}
                    {formData.rating === 2 && "Kém"}
                    {formData.rating === 3 && "Trung bình"}
                    {formData.rating === 4 && "Tốt"}
                    {formData.rating === 5 && "Rất tốt"}
                  </p>
                </div>
                
                <div>
                  <label htmlFor="content" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Nội dung đánh giá
                  </label>
                  <textarea
                    id="content"
                    name="content"
                    rows={4}
                    value={formData.content}
                    onChange={handleInputChange}
                    placeholder="Chia sẻ trải nghiệm của bạn về trang web..."
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
                  />
                </div>
                
                <button
                  type="submit"
                  className="w-full bg-indigo-600 dark:bg-indigo-700 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 dark:hover:bg-indigo-800 transition duration-200 flex items-center justify-center"
                >
                  <FaPaperPlane className="mr-2" />
                  Gửi đánh giá
                </button>
              </form>
            </div>
          </div>
          
          {/* Reviews List */}
          <div className="lg:w-2/3">
            {/* Filter and Sort Controls */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4 mb-6 transition-colors">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="flex items-center gap-4">
                  <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                    Các đánh giá ({sortedReviews.length})
                  </h2>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-3">
                  {/* Filter Dropdown */}
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600 dark:text-gray-400 whitespace-nowrap">Lọc:</span>
                    <select
                      value={filterBy}
                      onChange={(e) => setFilterBy(e.target.value)}
                      className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    >
                      <option value="all">Tất cả</option>
                      <option value="excellent">Xuất sắc (5⭐)</option>
                      <option value="good">Tốt (4⭐)</option>
                      <option value="average">Trung bình (3⭐)</option>
                      <option value="poor">Kém (1-2⭐)</option>
                      <option value="anonymous">Ẩn danh</option>
                      <option value="public">Công khai</option>
                    </select>
                  </div>
                  
                  {/* Sort Dropdown */}
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600 dark:text-gray-400 whitespace-nowrap">Sắp xếp:</span>
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    >
                      <option value="newest">Mới nhất</option>
                      <option value="oldest">Cũ nhất</option>
                      <option value="highest">Đánh giá cao nhất</option>
                      <option value="lowest">Đánh giá thấp nhất</option>
                      <option value="most_recent_update">Cập nhật gần nhất</option>
                      <option value="alphabetical">Theo tên A-Z</option>
                    </select>
                  </div>
                </div>
              </div>
              
              {/* Active Filters Display */}
              {filterBy !== 'all' && (
                <div className="mt-3 flex items-center gap-2">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Bộ lọc đang áp dụng:</span>
                  <span className="inline-flex items-center gap-1 px-2 py-1 bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200 text-xs rounded-full">
                    {filterBy === 'excellent' && 'Xuất sắc (5⭐)'}
                    {filterBy === 'good' && 'Tốt (4⭐)'}
                    {filterBy === 'average' && 'Trung bình (3⭐)'}
                    {filterBy === 'poor' && 'Kém (1-2⭐)'}
                    {filterBy === 'anonymous' && 'Ẩn danh'}
                    {filterBy === 'public' && 'Công khai'}
                    <button
                      onClick={() => setFilterBy('all')}
                      className="ml-1 hover:text-indigo-600 dark:hover:text-indigo-300"
                    >
                      ×
                    </button>
                  </span>
                </div>
              )}
            </div>
            
            {/* Reviews Container */}
            <div id="reviewsContainer" className="space-y-6">
              {sortedReviews.length > 0 ? (
                sortedReviews.map(review => (
                  <ReviewItem key={review.id} review={review} />
                ))
              ) : (
                <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-xl">
                  <div className="text-gray-500 dark:text-gray-400">
                    <FaUser className="mx-auto text-4xl mb-4 opacity-50" />
                    <p className="text-lg font-medium">Không có đánh giá nào</p>
                    <p className="text-sm">Thử thay đổi bộ lọc hoặc thêm đánh giá mới</p>
                  </div>
                </div>
              )}
            </div>
            
            {loading && (
              <div className="text-center py-8">
                <FaSpinner className="animate-spin text-4xl text-indigo-500 mx-auto mb-4" />
                <p className="text-gray-600 dark:text-gray-300">Đang tải thêm đánh giá...</p>
              </div>
            )}
            
            {showLoadMore && !loading && sortedReviews.length > 0 && (
              <button
                onClick={loadMoreReviews}
                className="w-full mt-6 bg-white dark:bg-gray-800 border border-indigo-600 dark:border-indigo-500 text-indigo-600 dark:text-indigo-400 py-3 px-4 rounded-lg hover:bg-indigo-50 dark:hover:bg-gray-700 transition duration-200 font-medium"
              >
                Tải thêm đánh giá
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer_C />
    </div>
  );
}
