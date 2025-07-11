"use client";
import { useAuth } from "@/context/AuthContext";
import { useCallback, useEffect, useState, useRef } from "react";
import useAxios from "./useAxios";
import { Api } from "@/configs/Api";
import { User } from "@/models/User";

export const useUserData = () => {
    const [userData, setUserData] = useState<User | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const { authTokens } = useAuth();
    const api = useAxios();
    
    const userDataRef = useRef<User | null>(null);
    const isFetchingRef = useRef(false);
    const hasInitialFetchRef = useRef(false);

    useEffect(() => {
        userDataRef.current = userData;
    }, [userData]);

    const fetchUserData = useCallback(
        async (forceRefresh = false) => {
            try {
                if (isFetchingRef.current && !forceRefresh) {
                    return userDataRef.current;
                }

                if (!authTokens?.refreshToken) {
                    setError("Phiên đăng nhập đã hết hạn");
                    setUserData(null);
                    return null;
                }

                if (!forceRefresh && userDataRef.current) {
                    console.log("Use caching data")
                    return userDataRef.current;
                }

                isFetchingRef.current = true;
                setLoading(true);
                setError(null);

                const response = await api.get(Api.Authenticaion.USER_INFO);
                console.log("Fetch new data")
                const newUserData = response.data.dataResponse;
                
                setUserData(newUserData);

                return newUserData;
            } catch (err) {
                let errorMessage = "Có lỗi xảy ra khi lấy dữ liệu";

                if (
                    typeof err === "object" &&
                    err !== null &&
                    "response" in err &&
                    err.response
                ) {
                    const response = (err as any).response;
                    switch (response.status) {
                        case 401:
                            errorMessage = "Phiên đăng nhập đã hết hạn, vui lòng đăng nhập lại";
                            break;
                        case 403:
                            errorMessage = "Bạn không có quyền truy cập dữ liệu này";
                            break;
                        case 404:
                            errorMessage = "Không tìm thấy dữ liệu người dùng";
                            break;
                        case 500:
                            errorMessage = "Lỗi server, vui lòng thử lại sau";
                            break;
                        default:
                            errorMessage = response.data?.message || errorMessage;
                    }
                } else if (
                    typeof err === "object" &&
                    err !== null &&
                    "request" in err &&
                    (err as any).request
                ) {
                    errorMessage = "Không thể kết nối đến server";
                } else {
                    errorMessage = (err as any).message || errorMessage;
                }

                setError(errorMessage);
                return null;
            } finally {
                isFetchingRef.current = false;
                setLoading(false);
            }
        },
        [authTokens?.refreshToken, api]
    );

    const clearUserData = useCallback(() => {
        setUserData(null);
        setError(null);
        hasInitialFetchRef.current = false;
    }, []);

    const updateUserData = useCallback((newData: Partial<User>) => {
        setUserData((prevData) => {
            if (!prevData) return prevData;
            return {
                ...prevData,
                ...newData,
            } as User;
        });
    }, []);

    useEffect(() => {
        const shouldFetch = authTokens?.refreshToken && 
                           !hasInitialFetchRef.current && 
                           !userDataRef.current && 
                           !isFetchingRef.current;

        if (shouldFetch) {
            hasInitialFetchRef.current = true;
            fetchUserData();
        }

        if (!authTokens?.refreshToken) {
            hasInitialFetchRef.current = false;
            if (userDataRef.current) {
                clearUserData();
            }
        }
    }, [authTokens?.refreshToken]);

    return {
        userData,
        loading,
        error,
        fetchUserData,
        clearUserData,
        updateUserData,
        isLoggedIn: !!authTokens?.refreshToken,
    };
};

export const useGetUserData = () => {
    const { authTokens } = useAuth();
    const api = useAxios();

    const getUserData = useCallback(async (): Promise<User> => {
        try {
            if (!authTokens?.refreshToken) {
                throw new Error('Phiên đăng nhập đã hết hạn');
            }

            const response = await api.get(Api.Authenticaion.USER_INFO);
            return response.data.dataResponse;

        } catch (err) {
            // console.error('Lỗi khi lấy dữ liệu người dùng:', err);
            let errorMessage = 'Có lỗi xảy ra khi lấy dữ liệu';
            if (typeof err === "object" && err !== null && "response" in err) {
                const errorWithResponse = err as { response: any };
                errorMessage = errorWithResponse.response.data?.message || `HTTP ${errorWithResponse.response.status}`;
            } 
            else if (typeof err === "object" && err !== null && "request" in err) {
                errorMessage = 'Không thể kết nối đến server';
            } 
            else if (typeof err === "object" && err !== null && "message" in err) {
                errorMessage = (err as { message: string }).message;
            }

            throw new Error(errorMessage);
        }
    }, [authTokens?.refreshToken, api]);

    return getUserData;
};