"use client";

import React, { useState, useEffect } from 'react';
import { Input } from '@/components/modern-ui/input';
import { Select } from '@/components/modern-ui/select';
import { FaStar, FaUserSecret, FaUser, FaPaperPlane, FaSpinner } from 'react-icons/fa';
import { ImSpinner2 } from 'react-icons/im';
import { toast } from 'sonner';
import HeaderTop_C from '@/components/combination/HeaderTop_C';
import Footer_C from '@/components/combination/Footer_C';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import type { Comment } from '@/models/Comment';
import useRatingManager from '@/hooks/useRatingManager';
import { Color } from '@/configs/CssConstant';

const anonymousAvatarUrl = "https://ui-avatars.com/api/?name=Anonymous&background=6b7280&color=fff";

export default function ReviewPage() {
  const { user } = useAuth();
  const router = useRouter();
  const {
    comments,
    setComments,
    createComment,
    getAllComments,
    // updateComment, // not used in this page
    // deleteComment, // not used in this page
    deleteComment,
  } = useRatingManager();

  const [formData, setFormData] = useState({
    isAnonymous: false,
    rating: 0,
    content: ''
  });

  const [sortBy, setSortBy] = useState('newest');
  const [filterBy, setFilterBy] = useState('all');
  const [loading, setLoading] = useState(false);
  const [showLoadMore, setShowLoadMore] = useState(true);
  const [showCount, setShowCount] = useState(5);
  const [deleteModal, setDeleteModal] = useState<{ open: boolean; reviewId?: string }>({ open: false });
  const [deleteLoading, setDeleteLoading] = useState(false);

  // Fetch comments on mount
  useEffect(() => {
    setLoading(true);
    getAllComments()
      .catch(() => toast.error('Không thể tải đánh giá'))
      .finally(() => setLoading(false));
  }, []); // Only run on mount

  // Star Rating Component
  interface StarRatingProps {
    rating: number;
    interactive?: boolean;
    onRatingChange?: (rating: number) => void;
  }

  const StarRating: React.FC<StarRatingProps> = ({ rating, interactive = false, onRatingChange }) => {
    const [hoveredRating, setHoveredRating] = useState<number>(0);

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
  const ReviewItem: React.FC<{ review: Comment }> = ({ review }) => {
    // console.log(review)
    const formatDate = (dateString: string | undefined) => {
      if (!dateString) return '';
      return new Date(dateString).toLocaleDateString('vi-VN', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    };

    // Add delete handler
    const openDeleteModal = () => {
      setDeleteModal({ open: true, reviewId: review.id });
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
                src={review.isAnonymous? anonymousAvatarUrl : review.avatarUrl} 
                alt={review.isAnonymous? 'Ẩn danh' : review.fullname} 
                className="w-12 h-12 rounded-full object-cover"
              />
            ) : (
              <div className="w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center" style={{ color: Color.MainColor }}>
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
                  <StarRating rating={review.rating ?? 0} />
                  <span className="text-gray-500 dark:text-gray-400 text-sm ml-2">
                    {review.rating ?? 0}/5
                  </span>
                </div>
              </div>
              <div className="text-right flex flex-col items-end gap-2">
                <span className="text-gray-400 dark:text-gray-500 text-sm">
                  {formatDate(review.createdDate)}
                </span>
                {/* Delete button for current user's comment */}
                {user?.username && review.username === user.username && (
                  <button
                    onClick={openDeleteModal}
                    className="text-red-600 dark:text-red-400 text-xs px-2 py-1 border border-red-200 dark:border-red-600 rounded hover:bg-red-50 dark:hover:bg-red-900 transition"
                    disabled={loading}
                  >
                    Xóa đánh giá
                  </button>
                )}
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
  const filterReviews = (reviewsToFilter: Comment[], option: string): Comment[] => {
    switch(option) {
      case 'all':
        return reviewsToFilter;
      case 'excellent':
        return reviewsToFilter.filter((review: Comment) => review.rating === 5);
      case 'good':
        return reviewsToFilter.filter((review: Comment) => review.rating === 4);
      case 'average':
        return reviewsToFilter.filter((review: Comment) => review.rating === 3);
      case 'poor':
        return reviewsToFilter.filter((review: Comment) => (review.rating ?? 0) <= 2);
      case 'anonymous':
        return reviewsToFilter.filter((review: Comment) => review.isAnonymous);
      case 'public':
        return reviewsToFilter.filter((review: Comment) => !review.isAnonymous);
      default:
        return reviewsToFilter;
    }
  };

  // Sort reviews based on selected option
  const sortReviews = (reviewsToSort: Comment[], option: string): Comment[] => {
    switch(option) {
      case 'newest':
        return [...reviewsToSort].sort((a: Comment, b: Comment) => new Date(b.createdDate ?? '').getTime() - new Date(a.createdDate ?? '').getTime());
      case 'oldest':
        return [...reviewsToSort].sort((a: Comment, b: Comment) => new Date(a.createdDate ?? '').getTime() - new Date(b.createdDate ?? '').getTime());
      case 'highest':
        return [...reviewsToSort].sort((a: Comment, b: Comment) => (b.rating ?? 0) - (a.rating ?? 0));
      case 'lowest':
        return [...reviewsToSort].sort((a: Comment, b: Comment) => (a.rating ?? 0) - (b.rating ?? 0));
      case 'most_recent_update':
        return [...reviewsToSort].sort((a: Comment, b: Comment) => new Date(b.updatedDate ?? '').getTime() - new Date(a.updatedDate ?? '').getTime());
      case 'alphabetical':
        return [...reviewsToSort].sort((a: Comment, b: Comment) => {
          const nameA = a.isAnonymous ? 'Ẩn danh' : (a.fullname ?? '');
          const nameB = b.isAnonymous ? 'Ẩn danh' : (b.fullname ?? '');
          return nameA.localeCompare(nameB);
        });
      default:
        return reviewsToSort;
    }
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.rating) {
      toast.error('Vui lòng chọn số sao đánh giá');
      return;
    }
    if (!formData.content.trim()) {
      toast.error('Vui lòng viết nội dung đánh giá');
      return;
    }
    setLoading(true);
    const body = {
      username: user?.username,
      fullname: user?.fullname,
      avatarUrl: user?.avatarUrl,
      isAnonymous: formData.isAnonymous,
      content: formData.content,
      rating: formData.rating
    };
    try {
      console.log(body)
      const newComment = await createComment(body);
      if (newComment) {
        setComments(prev => [newComment, ...prev]);
        setFormData({ isAnonymous: false, rating: 0, content: '' });
        setShowCount(count => count + 1); 
        toast.success('Đánh giá đã được gửi thành công!');
      }
    } catch {
      toast.error('Không thể gửi đánh giá');
    } finally {
      setLoading(false);
    }
  };

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' && 'checked' in e.target ? (e.target as HTMLInputElement).checked : value
    }));
  };

  // Handle rating change
  const handleRatingChange = (rating: number) => {
    setFormData(prev => ({ ...prev, rating }));
  };

  // Confirm Delete Modal
  const handleConfirmDelete = async () => {
    if (!deleteModal.reviewId) return;
    setDeleteLoading(true);
    try {
      await deleteComment(deleteModal.reviewId);
      setComments(prev => prev.filter(c => c.id !== deleteModal.reviewId));
    } catch {
      // toast handled in hook
    } finally {
      setDeleteLoading(false);
      setDeleteModal({ open: false });
    }
  };

  // Use comments from hook instead of reviews
  const filteredReviews = filterReviews(comments, filterBy);
  let sortedReviews = sortReviews(filteredReviews, sortBy);
  // Move current user's comments to the top
  if (user?.username) {
    sortedReviews = [
      ...sortedReviews.filter((c) => c.username === user.username),
      ...sortedReviews.filter((c) => c.username !== user.username)
    ];
  }
  const visibleReviews = sortedReviews.slice(0, showCount);

  // Calculate statistics
  const totalReviews = comments.length;
  const averageRating = totalReviews > 0 ? (comments.reduce((sum, review) => sum + (review.rating ?? 0), 0) / totalReviews).toFixed(1) : '0';
  const ratingDistribution = [5, 4, 3, 2, 1].map(star => 
    comments.filter((review: Comment) => review.rating === star).length
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      {/* Confirm Delete Modal */}
      {deleteModal.open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/60 backdrop-blur-sm">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 w-full max-w-sm mx-auto">
            <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Xác nhận xóa đánh giá</h3>
            <p className="mb-6 text-gray-700 dark:text-gray-300">Bạn có chắc chắn muốn xóa đánh giá này không? Hành động này không thể hoàn tác.</p>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setDeleteModal({ open: false })}
                className="px-4 py-2 rounded bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition"
                disabled={loading}
              >
                Hủy
              </button>
              <button
                onClick={handleConfirmDelete}
                className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700 transition disabled:opacity-60 flex items-center justify-center gap-2"
                disabled={deleteLoading}
              >
                {deleteLoading ? (
                  <ImSpinner2 className="animate-spin h-4 w-4" />
                ) : null}
                Xóa
              </button>
            </div>
          </div>
        </div>
      )}
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
          <h1 className="text-4xl font-bold mb-2" style={{ color: Color.MainColor }}>
            Đánh giá trang web
          </h1>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Chia sẻ trải nghiệm của bạn về trang web tư vấn luật giao thông. 
            Đánh giá của bạn giúp chúng tôi cải thiện dịch vụ tốt hơn.
          </p>
          
          {/* Statistics */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">
              <div className="text-2xl font-bold" style={{ color: Color.MainColor }}>{totalReviews}</div>
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
                    className="h-4 w-4 border-gray-300 dark:border-gray-600 rounded"
                    style={{ color: Color.MainColor }}
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
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
                  />
                </div>
                
                <button
                  type="submit"
                  className="w-full text-white py-2 px-4 rounded-lg transition duration-200 flex items-center justify-center"
                  style={{ backgroundColor: Color.MainColor }}
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
                      className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
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
                      className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
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
                  <span className="inline-flex items-center gap-1 px-2 py-1 text-xs rounded-full" style={{ backgroundColor: Color.MainColor + '20', color: Color.MainColor }}>
                    {filterBy === 'excellent' && 'Xuất sắc (5⭐)'}
                    {filterBy === 'good' && 'Tốt (4⭐)'}
                    {filterBy === 'average' && 'Trung bình (3⭐)'}
                    {filterBy === 'poor' && 'Kém (1-2⭐)'}
                    {filterBy === 'anonymous' && 'Ẩn danh'}
                    {filterBy === 'public' && 'Công khai'}
                    <button
                      onClick={() => setFilterBy('all')}
                      className="ml-1 hover:opacity-70"
                      style={{ color: Color.MainColor }}
                    >
                      ×
                    </button>
                  </span>
                </div>
              )}
            </div>
            
            {/* Loading Spinner */}
            {loading && (
              <div className="text-center py-8">
                <FaSpinner className="animate-spin text-4xl mx-auto mb-4" style={{ color: Color.MainColor }} />
                <p className="text-gray-600 dark:text-gray-300">Đang tải đánh giá...</p>
              </div>
            )}

            {/* Reviews Container */}
            <div id="reviewsContainer" className="space-y-6">
              {!loading && (visibleReviews.length > 0 ? (
                visibleReviews.map((review: Comment) => (
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
              ))}
            </div>
            {/* Load More Button */}
            {!loading && showCount < sortedReviews.length && (
              <button
                onClick={() => setShowCount(count => count + 5)}
                className="w-full mt-6 bg-white dark:bg-gray-800 py-3 px-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition duration-200 font-medium"
                style={{ borderColor: Color.MainColor, color: Color.MainColor }}
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
