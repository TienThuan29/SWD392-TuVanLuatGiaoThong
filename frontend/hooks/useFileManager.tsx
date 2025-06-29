import { useState, useCallback } from "react";
import useAxios from "./useAxios";
import { Api } from "@/configs/Api";
import HttpStatus from "@/configs/HttpStatus";
import { toast } from "sonner";

export interface FileUploadResponse {
    fileUrl: string;
    fileName: string;
    folderName: string;
}

export function useFileManager() {
    
    const api = useAxios();
    const [uploadedFile, setUploadedFile] = useState<FileUploadResponse | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Upload file to S3
    const uploadFile = useCallback(async (file: File, folderName: string = "laws") => {
        setLoading(true);
        setError(null);
        try {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('folderName', folderName);

            const response = await api.post(Api.File.UPLOAD, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (response.status === HttpStatus.CREATED) {
                const fileData = response.data.dataResponse;
                setUploadedFile(fileData);
                toast.success("Tải file lên thành công");
                return fileData;
            } else {
                toast.error("Có lỗi xảy ra khi tải file lên");
            }
        } 
        catch (err: any) {
            toast.error("Có lỗi xảy ra khi tải file lên");
            setError(err.message || "Unknown error");
            throw err;
        } 
        finally {
            setLoading(false);
        }
    }, []);

    // Create folder in S3
    const createFolder = useCallback(async (folderName: string) => {
        setLoading(true);
        setError(null);
        try {
            const response = await api.post(Api.File.CREATE_FOLDER, null, {
                params: { folderName }
            });

            if (response.status === HttpStatus.CREATED) {
                toast.success("Tạo thư mục thành công");
                return response.data.dataResponse;
            } else {
                toast.error("Có lỗi xảy ra khi tạo thư mục");
            }
        } 
        catch (err: any) {
            toast.error("Có lỗi xảy ra khi tạo thư mục");
            setError(err.message || "Unknown error");
            throw err;
        } 
        finally {
            setLoading(false);
        }
    }, []);

    // Clear uploaded file
    const clearUploadedFile = useCallback(() => {
        setUploadedFile(null);
        setError(null);
    }, []);

    return {
        uploadedFile,
        loading,
        error,
        uploadFile,
        createFolder,
        clearUploadedFile,
    };
}
