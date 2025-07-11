import { useState, useCallback } from "react";
import { User } from "../models/User";
import useAxios from "./useAxios";
import { Api } from "@/configs/Api";
import HttpStatus from "@/configs/HttpStatus";
import { toast } from "sonner";
import { useFileManager } from "./useFileManager";

export function useUserCrud() {
    const api = useAxios();
    const { uploadFile } = useFileManager();
    const [users, setUsers] = useState<User[]>([]);
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Get all users
    const getAllUsers = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await api.get(Api.User.GET_ALL)
            if (response.status === HttpStatus.OK) 
                setUsers(response.data.dataResponse);
            else 
                toast.error("Có lỗi xảy ra khi lấy dữ liệu người dùng")
        } 
        catch (err: any) {
            toast.error("Có lỗi xảy ra khi lấy dữ liệu người dùng")
            setError(err.message || "Unknown error");
            console.log(err.message)
        } 
        finally {
            setLoading(false);
        }
    }, []);

    // Get user by ID
    const getUserById = useCallback(async (id: string) => {
        // setLoading(true);
        // setError(null);
        // try {
        //     const res = await api.get()
        //     if (!res.ok) throw new Error("Failed to fetch user");
        //     const data = await res.json();
        //     setUser(data);
        // } catch (err: any) {
        //     setError(err.message || "Unknown error");
        // } finally {
        //     setLoading(false);
        // }
    }, []);

    // Create user
    const createUser = useCallback(async (newUser: User) => {
        // setLoading(true);
        // setError(null);
        // try {
        //     const res = await fetch("/api/users", {
        //         method: "POST",
        //         headers: { "Content-Type": "application/json" },
        //         body: JSON.stringify(newUser),
        //     });
        //     if (!res.ok) throw new Error("Failed to create user");
        //     const data = await res.json();
        //     setUsers((prev) => [...prev, data]);
        //     return data;
        // } catch (err: any) {
        //     setError(err.message || "Unknown error");
        //     throw err;
        // } finally {
        //     setLoading(false);
        // }
    }, []);

    // Update user
    const updateUser = useCallback(async (id: string, updatedUser: Partial<User>) => {
        // setLoading(true);
        // setError(null);
        // try {
        //     const res = await fetch(`/api/users/${id}`, {
        //         method: "PUT",
        //         headers: { "Content-Type": "application/json" },
        //         body: JSON.stringify(updatedUser),
        //     });
        //     if (!res.ok) throw new Error("Failed to update user");
        //     const data = await res.json();
        //     setUsers((prev) => prev.map((u) => (u.id === id ? data : u)));
        //     return data;
        // } catch (err: any) {
        //     setError(err.message || "Unknown error");
        //     throw err;
        // } finally {
        //     setLoading(false);
        // }
    }, []);

    // Update user info with avatar upload
    const updateUserInfo = useCallback(async (
        userId: string, 
        userData: { 
            fullname?: string; 
            birthDay?: string; 
            avatarFile?: File;
            avatarUrl?: string; // Add existing avatar URL
        }
    ) => {
        setLoading(true);
        setError(null);
        
        try {
            let avatarUrl = undefined;
            
            // Upload avatar if provided
            if (userData.avatarFile) {
                try {
                    const fileData = await uploadFile(userData.avatarFile, "avatars");
                    avatarUrl = fileData.fileUrl;
                    console.log("Avatar uploaded successfully:", avatarUrl);
                } catch (uploadError) {
                    console.error("Avatar upload failed:", uploadError);
                    toast.error("Tải avatar lên thất bại. Vui lòng thử lại.");
                    return;
                }
            } else if (userData.avatarUrl) {
                // Use existing avatar URL if no new file is uploaded
                avatarUrl = userData.avatarUrl;
                console.log("Using existing avatar URL:", avatarUrl);
            }

            // Prepare request body
            const requestBody: {
                fullname?: string;
                avatarUrl?: string;
                birthDay?: string;
            } = {};

            if (userData.fullname !== undefined) {
                requestBody.fullname = userData.fullname;
            }
            
            if (avatarUrl) {
                requestBody.avatarUrl = avatarUrl;
            }
            
            if (userData.birthDay !== undefined) {
                requestBody.birthDay = userData.birthDay;
            }

            console.log("Sending update request:", requestBody);

            // Send PUT request to update user info
            const response = await api.put(
                `${Api.User.UPDATE_USER_INFO}${userId}`, 
                requestBody
            );

            if (response.status === HttpStatus.OK) {
                toast.success("Cập nhật thông tin thành công!");
                return response.data.dataResponse;
            } else {
                const errorMessage = "Có lỗi xảy ra khi cập nhật thông tin";
                toast.error(errorMessage);
                throw new Error(errorMessage);
            }
        } catch (err: any) {
            const errorMessage = err.message || "Có lỗi xảy ra khi cập nhật thông tin";
            toast.error(errorMessage);
            setError(errorMessage);
            throw err;
        } finally {
            setLoading(false);
        }
    }, [api, uploadFile]);

    // Delete user
    const deleteUser = useCallback(async (id: string) => {
        // setLoading(true);
        // setError(null);
        // try {
        //     const res = await fetch(`/api/users/${id}`, {
        //         method: "DELETE",
        //     });
        //     if (!res.ok) throw new Error("Failed to delete user");
        //     setUsers((prev) => prev.filter((u) => u.id !== id));
        // } catch (err: any) {
        //     setError(err.message || "Unknown error");
        //     throw err;
        // } finally {
        //     setLoading(false);
        // }
    }, []);

    return {
        users,
        user,
        loading,
        error,
        getAllUsers,
        getUserById,
        createUser,
        updateUser,
        updateUserInfo,
        deleteUser,
    };
}
