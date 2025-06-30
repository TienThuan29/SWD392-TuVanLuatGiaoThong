import { useState, useCallback } from "react";
import { UsagePackage } from "../models/UsagePackage";
import useAxios from "./useAxios";
import { Api } from "@/configs/Api";
import HttpStatus from "@/configs/HttpStatus";
import { toast } from "sonner";
import axios from "axios";

export function useUsagePackageCrud() {
    const api = useAxios();
    const [usagePackages, setUsagePackages] = useState<UsagePackage[]>([]);
    const [usagePackage, setUsagePackage] = useState<UsagePackage | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Get all usage packages
    const getAllUsagePackages = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get(Api.BASE_API + Api.UsagePackage.GET_ALL)
            if (response.status === HttpStatus.OK) 
                setUsagePackages(response.data.dataResponse);
            else 
                toast.error("Có lỗi xảy ra khi lấy dữ liệu gói sử dụng")
        } 
        catch (err: any) {
            toast.error("Có lỗi xảy ra khi lấy dữ liệu gói sử dụng")
            setError(err.message || "Unknown error");
            console.log(err.message)
        } 
        finally {
            setLoading(false);
        }
    }, []);

    // Get usage package by ID
    const getUsagePackageById = useCallback(async (id: string) => {
        setLoading(true);
        setError(null);
        try {
            const response = await api.get(Api.UsagePackage.GET_BY_ID + id)
            if (response.status === HttpStatus.OK) 
                setUsagePackage(response.data.dataResponse);
            else 
                toast.error("Có lỗi xảy ra khi lấy dữ liệu gói sử dụng")
        } 
        catch (err: any) {
            toast.error("Có lỗi xảy ra khi lấy dữ liệu gói sử dụng")
            setError(err.message || "Unknown error");
            console.log(err.message)
        } 
        finally {
            setLoading(false);
        }
    }, []);

    // Create usage package
    const createUsagePackage = useCallback(async (newUsagePackage: Partial<UsagePackage>) => {
        setLoading(true);
        setError(null);
        try {
            const response = await api.post(Api.UsagePackage.CREATE, newUsagePackage)
            if (response.status === HttpStatus.OK) {
                setUsagePackages((prev) => [...prev, response.data.dataResponse]);
                toast.success("Tạo gói sử dụng thành công");
                return response.data.dataResponse;
            } else {
                toast.error("Có lỗi xảy ra khi tạo gói sử dụng")
            }
        } 
        catch (err: any) {
            toast.error("Có lỗi xảy ra khi tạo gói sử dụng")
            setError(err.message || "Unknown error");
            throw err;
        } 
        finally {
            setLoading(false);
        }
    }, []);

    // Update usage package
    const updateUsagePackage = useCallback(async (id: string, updatedUsagePackage: Partial<UsagePackage>) => {
        setLoading(true);
        setError(null);
        try {
            const response = await api.put(Api.UsagePackage.UPDATE + id, updatedUsagePackage)
            if (response.status === HttpStatus.OK) {
                setUsagePackages((prev) => prev.map((pkg) => (pkg.id === id ? response.data.dataResponse : pkg)));
                toast.success("Cập nhật gói sử dụng thành công");
                return response.data.dataResponse;
            } else {
                toast.error("Có lỗi xảy ra khi cập nhật gói sử dụng")
            }
        } 
        catch (err: any) {
            toast.error("Có lỗi xảy ra khi cập nhật gói sử dụng")
            setError(err.message || "Unknown error");
            throw err;
        } 
        finally {
            setLoading(false);
        }
    }, []);

    // Delete usage package (soft delete by setting isDeleted to true)
    const deleteUsagePackage = useCallback(async (id: string) => {
        setLoading(true);
        setError(null);
        try {
            const response = await api.put(Api.UsagePackage.DEACTIVATE + id)
            if (response.status === HttpStatus.OK) {
                setUsagePackages((prev) => prev.filter((pkg) => pkg.id !== id));
                toast.success("Xóa gói sử dụng thành công");
            } else {
                toast.error("Có lỗi xảy ra khi xóa gói sử dụng")
            }
        } 
        catch (err: any) {
            toast.error("Có lỗi xảy ra khi xóa gói sử dụng")
            setError(err.message || "Unknown error");
            throw err;
        } 
        finally {
            setLoading(false);
        }
    }, []);

    return {
        usagePackages,
        usagePackage,
        loading,
        error,
        getAllUsagePackages,
        getUsagePackageById,
        createUsagePackage,
        updateUsagePackage,
        deleteUsagePackage,
    };
}
