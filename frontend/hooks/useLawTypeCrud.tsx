import { useState, useCallback } from "react";
import { LawType } from "../models/Law";
import useAxios from "./useAxios";
import { Api } from "@/configs/Api";
import HttpStatus from "@/configs/HttpStatus";
import { toast } from "sonner";

export function useLawTypeCrud() {
    const api = useAxios();
    const [lawTypes, setLawTypes] = useState<LawType[]>([]);
    const [lawType, setLawType] = useState<LawType | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Get all law types
    const getAllLawTypes = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await api.get(Api.LawType.GET_ALL);
            if (response.status === HttpStatus.OK)
                setLawTypes(response.data.dataResponse);
            else toast.error("Có lỗi xảy ra khi lấy dữ liệu loại luật");
        } catch (err: any) {
            toast.error("Có lỗi xảy ra khi lấy dữ liệu loại luật");
            setError(err.message || "Unknown error");
            console.log(err.message);
        } finally {
            setLoading(false);
        }
    }, []);

    // Get law type by ID
    const getLawTypeById = useCallback(async (id: string) => {
        setLoading(true);
        setError(null);
        try {
            const response = await api.get(Api.LawType.GET_BY_ID + id);
            if (response.status === HttpStatus.OK)
                setLawType(response.data.dataResponse);
            else toast.error("Có lỗi xảy ra khi lấy dữ liệu loại luật");
        } catch (err: any) {
            toast.error("Có lỗi xảy ra khi lấy dữ liệu loại luật");
            setError(err.message || "Unknown error");
            console.log(err.message);
        } finally {
            setLoading(false);
        }
    }, []);

    // Create law type
    const createLawType = useCallback(async (newLawType: LawType) => {
        setLoading(true);
        setError(null);
        try {
            const response = await api.post(Api.LawType.CREATE, newLawType);
            if (response.status === HttpStatus.OK) {
                setLawTypes((prev) => [...prev, response.data.dataResponse]);
                toast.success("Tạo loại luật thành công");
                return response.data.dataResponse;
            } else {
                toast.error("Có lỗi xảy ra khi tạo loại luật");
            }
        } catch (err: any) {
            toast.error("Có lỗi xảy ra khi tạo loại luật");
            setError(err.message || "Unknown error");
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    // Update law type
    const updateLawType = useCallback(
        async (id: string, updatedLawType: Partial<LawType>) => {
            setLoading(true);
            setError(null);
            try {
                const response = await api.put(Api.LawType.UPDATE + id, updatedLawType);
                if (response.status === HttpStatus.OK) {
                    setLawTypes((prev) =>
                        prev.map((lt) => (lt.id === id ? response.data.dataResponse : lt))
                    );
                    toast.success("Cập nhật loại luật thành công");
                    return response.data.dataResponse;
                } else {
                    toast.error("Có lỗi xảy ra khi cập nhật loại luật");
                }
            } catch (err: any) {
                toast.error("Có lỗi xảy ra khi cập nhật loại luật");
                setError(err.message || "Unknown error");
                throw err;
            } finally {
                setLoading(false);
            }
        },
        []
    );

    // Delete law type (soft delete by setting isDeleted to true)
    const deleteLawType = useCallback(async (id: string) => {
        setLoading(true);
        setError(null);
        try {
            const response = await api.put(Api.LawType.UPDATE + id, {
                isDeleted: true,
            });
            if (response.status === HttpStatus.OK) {
                setLawTypes((prev) => prev.filter((lt) => lt.id !== id));
                toast.success("Xóa loại luật thành công");
            } else {
                toast.error("Có lỗi xảy ra khi xóa loại luật");
            }
        } catch (err: any) {
            toast.error("Có lỗi xảy ra khi xóa loại luật");
            setError(err.message || "Unknown error");
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    return {
        lawTypes,
        lawType,
        loading,
        error,
        getAllLawTypes,
        getLawTypeById,
        createLawType,
        updateLawType,
        deleteLawType,
    };
}
