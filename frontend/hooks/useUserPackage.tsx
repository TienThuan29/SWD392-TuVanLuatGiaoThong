import { useState, useCallback, useEffect } from "react";
import { UsagePackage } from "../models/UsagePackage";
import useAxios from "./useAxios";
import { Api } from "@/configs/Api";
import HttpStatus from "@/configs/HttpStatus";
import { toast } from "sonner";
import { useAuth } from "@/context/AuthContext";

export default function useUserPackage() {
    
    const api = useAxios();
    const { user } = useAuth();
    const [currentPackage, setCurrentPackage] = useState<UsagePackage | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Get current usage package of user
    const getCurrentUsagePackage = useCallback(async () => {
        if (!user?.id) {
            setError("User not authenticated");
            return;
        }

        setLoading(true);
        setError(null);
        try {
            const response = await api.get(`${Api.UsagePackage.GET_CURRENT_USAGE_PACKAGE_OF_USER}${user.id}`);
            if (response.status === HttpStatus.OK) {
                setCurrentPackage(response.data.dataResponse);
            } 
            else {
                toast.error("Có lỗi xảy ra khi lấy thông tin gói sử dụng");
            }
        } 
        catch (err: any) {
            toast.error("Có lỗi xảy ra khi lấy thông tin gói sử dụng");
            setError(err.message || "Unknown error");
            console.log(err.message);
        } 
        finally {
            setLoading(false);
        }
    }, [api, user?.id]);

    // Auto-fetch current package when user is available
    useEffect(() => {
        if (user?.id) {
            getCurrentUsagePackage();
        }
    }, [user?.id, getCurrentUsagePackage]);

    return {
        currentPackage,
        loading,
        error,
        getCurrentUsagePackage,
    };
}