import { useCallback, useState } from 'react';
import useAxios from './useAxios';
import { Api } from '@/configs/Api';
import type { Comment } from '@/models/Comment';
import HttpStatus from '@/configs/HttpStatus';
import { toast } from 'sonner';

export type CommentCreateRequest = {
  username?: string;
  fullname?: string;
  avatarUrl?: string;
  content: string;
  rating: number;
  isAnonymous: boolean;
};

const useRatingManager = () => {
  const api = useAxios();
  const [comments, setComments] = useState<Comment[]>([]);

  // Create a new comment
  const createComment = useCallback(async (body: CommentCreateRequest): Promise<Comment | undefined> => {
    try {
      const response = await api.post(Api.Comment.CREATE, body);
      if (response.status === HttpStatus.CREATED && response.data.status == 'success') {
        toast.success("Đánh giá thành công!")
        return response.data.dataResponse;
      }
      else if (response.data.status == 'fail') {
        console.log(response.data)
        toast.error(response.data.message);
      }
    } 
    catch (err: any) {
      // toast.error('Có lỗi xảy ra khi tạo đánh giá');
      console.error('Error creating comment:', err);
      throw err;
    }
    return undefined;
  }, []);

  // Get all comments
  const getAllComments = useCallback(async (): Promise<Comment[]> => {
    try {
      const response = await api.get(Api.Comment.GET_ALL);
      setComments(response.data.dataResponse);
      return response.data.dataResponse;
    } catch (err: any) {
      // toast.error('Có lỗi xảy ra khi lấy đánh giá');
      console.error('Error getting comments:', err);
      throw err;
    }
  }, [api]);

  // Update a comment
  const updateComment = useCallback(async (id: string, body: Partial<CommentCreateRequest>): Promise<Comment | undefined> => {
    try {
      const response = await api.put(Api.Comment.UPDATE, { id, ...body });
      if (response.status === HttpStatus.OK) {
        return response.data.dataResponse;
      }
    } catch (err: any) {
      // toast.error('Có lỗi xảy ra khi cập nhật đánh giá');
      console.error('Error updating comment:', err);
      throw err;
    }
  }, []);

  // Delete a comment
  const deleteComment = useCallback(async (id: string): Promise<void> => {
    try {
        const response = await api.delete(Api.Comment.DELETE + id);
        if (response.status === HttpStatus.OK) {
            toast.success("Xóa đánh giá của bạn thành công!")
        }
    } catch (err: any) {
      // toast.error('Có lỗi xảy ra khi xóa đánh giá');
      console.error('Error deleting comment:', err);
      throw err;
    }
  }, []);

  return {
    comments,
    setComments,
    createComment,
    getAllComments,
    updateComment,
    deleteComment,
  };
};

export default useRatingManager;
