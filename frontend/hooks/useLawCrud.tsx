import { useState, useCallback } from "react";
import { Law } from "../models/Law";
import useAxios from "./useAxios";
import { Api } from "@/configs/Api";
import HttpStatus from "@/configs/HttpStatus";
import { toast } from "sonner";
import axios from "axios";

export function useLawCrud() {
    const api = useAxios();
    const [laws, setLaws] = useState<Law[]>([]);
    const [law, setLaw] = useState<Law | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Get all laws
    const getAllLaws = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            console.log("prepapre call laws")
            const response = await axios.get(Api.BASE_API + Api.Law.GET_ALL)
            console.log("Laws", response.data.dataResponse)
            if (response.status === HttpStatus.OK) 
                setLaws(response.data.dataResponse);
            else 
                toast.error("Có lỗi xảy ra khi lấy dữ liệu luật")
        } 
        catch (err: any) {
            toast.error("Có lỗi xảy ra khi lấy dữ liệu luật")
            setError(err.message || "Unknown error");
            console.log(err.message)
        } 
        finally {
            setLoading(false);
        }
    }, []);

    // Get law by ID
    const getLawById = useCallback(async (id: string) => {
        setLoading(true);
        setError(null);
        try {
            const response = await api.get(Api.Law.GET_BY_ID + id)
            if (response.status === HttpStatus.OK) 
                setLaw(response.data.dataResponse);
            else 
                toast.error("Có lỗi xảy ra khi lấy dữ liệu luật")
        } 
        catch (err: any) {
            toast.error("Có lỗi xảy ra khi lấy dữ liệu luật")
            setError(err.message || "Unknown error");
            console.log(err.message)
        } 
        finally {
            setLoading(false);
        }
    }, []);

    // Create law
    const createLaw = useCallback(async (newLaw: Partial<Law>) => {
        setLoading(true);
        setError(null);
        try {
            console.log("New law ", newLaw)
            const response = await api.post(Api.Law.CREATE, newLaw)
            if (response.status === HttpStatus.OK) {
                setLaws((prev) => [...prev, response.data.dataResponse]);
                toast.success("Tạo luật thành công");
                return response.data.dataResponse;
            } else {
                toast.error("Có lỗi xảy ra khi tạo luật")
            }
        } 
        catch (err: any) {
            toast.error("Có lỗi xảy ra khi tạo luật")
            setError(err.message || "Unknown error");
            throw err;
        } 
        finally {
            setLoading(false);
        }
    }, []);

    // Update law
    const updateLaw = useCallback(async (id: string, updatedLaw: Partial<Law>) => {
        setLoading(true);
        setError(null);
        try {
            const response = await api.put(Api.Law.UPDATE + id, updatedLaw)
            if (response.status === HttpStatus.OK) {
                setLaws((prev) => prev.map((law) => (law.id === id ? response.data.dataResponse : law)));
                toast.success("Cập nhật luật thành công");
                return response.data.dataResponse;
            } else {
                toast.error("Có lỗi xảy ra khi cập nhật luật")
            }
        } 
        catch (err: any) {
            toast.error("Có lỗi xảy ra khi cập nhật luật")
            setError(err.message || "Unknown error");
            throw err;
        } 
        finally {
            setLoading(false);
        }
    }, []);

    // Delete law (soft delete by setting isDeleted to true)
    const deleteLaw = useCallback(async (id: string) => {
        setLoading(true);
        setError(null);
        try {
            const response = await api.put(Api.Law.DEACTIVATE + id)
            if (response.status === HttpStatus.OK) {
                setLaws((prev) => prev.filter((law) => law.id !== id));
                toast.success("Xóa luật thành công");
            } else {
                toast.error("Có lỗi xảy ra khi xóa luật")
            }
        } 
        catch (err: any) {
            toast.error("Có lỗi xảy ra khi xóa luật")
            setError(err.message || "Unknown error");
            throw err;
        } 
        finally {
            setLoading(false);
        }
    }, []);

    return {
        laws,
        law,
        loading,
        error,
        getAllLaws,
        getLawById,
        createLaw,
        updateLaw,
        deleteLaw,
    };
} 