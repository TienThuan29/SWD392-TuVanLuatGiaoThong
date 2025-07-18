"use client";
import Spinner_C from "@/components/combination/Spinner_C";
import Constant from "@/configs/Constant";
import { useAuth } from "@/context/AuthContext";
import { useRoleValidator } from "@/hooks/useRoleValidator";
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from "react";
import axios from 'axios';
import { Api } from '@/configs/Api';
import HttpStatus from '@/configs/HttpStatus';

export default function Page() {
    const router = useRouter();
    const { setAuthTokens, setUser, user, isLoggedIn } = useAuth();
    const [isProcessing, setIsProcessing] = useState(true);
    const [tokensSet, setTokensSet] = useState(false);
    const [userFetched, setUserFetched] = useState(false);
    
    const { isAdmin, isUser, role } = useRoleValidator(user);

    // Function to fetch user data
    const fetchUserData = async (tokens: { accessToken: string; refreshToken: string }) => {
        try {
            const response = await axios.get(Api.BASE_API + Api.Authenticaion.USER_INFO, {
                headers: {
                    'Authorization': `Bearer ${tokens.accessToken}`
                }
            });
            
            if (response.status === HttpStatus.OK) {
                console.log("User data from API:", response.data.dataResponse);
                setUser(response.data.dataResponse);
                setUserFetched(true);
            }
        } catch (error) {
            console.error('Failed to fetch user data:', error);
            setIsProcessing(false);
        }
    };

    useEffect(() => {
        const processOAuth2Tokens = async () => {
            const params = new URLSearchParams(window.location.search);
            const accessToken = params.get("accessToken");
            const refreshToken = params.get("refreshToken");

            if (accessToken && refreshToken) {
                const tokens = { accessToken, refreshToken };
                localStorage.setItem(Constant.AuthTokenKey, JSON.stringify(tokens));
                await setAuthTokens(tokens);
                setTokensSet(true);
                
                // Fetch user data after setting tokens
                await fetchUserData(tokens);
            }
            setIsProcessing(false);
        };

        processOAuth2Tokens();
    }, [setAuthTokens, setUser]);

    useEffect(() => {
        // Debug logging
        // console.log("Current state:", {
        //     tokensSet,
        //     userFetched,
        //     user,
        //     isLoggedIn: isLoggedIn(),
        //     isProcessing,
        //     isAdmin,
        //     isUser,
        //     role
        // });

        // Only redirect when tokens are set, user data is fetched, and user is logged in
        if (tokensSet && userFetched && user && isLoggedIn() && !isProcessing) {
            console.log("User data:", user);
            console.log("isAdmin:", isAdmin, "isUser:", isUser, "role:", role);
            
            if (isAdmin) {
                console.log("Redirecting to admin dashboard");
                router.push(Constant.Page.AdminDashboardPage);
            } 
            else if (isUser) {
                console.log("Redirecting to home page");
                router.push(Constant.Page.HomePage);
            }
            else {
                console.log("No valid role found, user role:", user.role);
            }
        }
    }, [tokensSet, userFetched, user, isAdmin, isUser, role, isLoggedIn, isProcessing, router]);

    // Show loading spinner while processing
    if (isProcessing || !tokensSet || !userFetched || !user) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="flex flex-col items-center space-y-4">
                    <Spinner_C size="h-8 w-8 border-2" color="green-600" />
                    <p className="text-gray-600">Đang đăng nhập...</p>
                </div>
            </div>
        );
    }

    return null;
}