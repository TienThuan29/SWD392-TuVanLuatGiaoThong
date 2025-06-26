import { useState, useCallback } from "react";
import { User } from "../models/User";
import useAxios from "./useAxios";
import { Api } from "@/configs/Api";
import HttpStatus from "@/configs/HttpStatus";
import { toast } from "sonner";

export function useUserCrud() {
    const api = useAxios();
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
        deleteUser,
    };
}
