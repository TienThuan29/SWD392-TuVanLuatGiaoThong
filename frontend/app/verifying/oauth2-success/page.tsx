"use client";
import Spinner_C from "@/components/combination/Spinner_C";
import Constant from "@/configs/Constant";
import { useAuth } from "@/context/AuthContext";
import { useRoleValidator } from "@/hooks/useRoleValidator";
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from "react";

export default function Page() {
    const router = useRouter();
    const { setAuthTokens, user } = useAuth();
    const [isProcessing, setIsProcessing] = useState(true);

    useEffect(() => {
        const processOAuth2Tokens = async () => {
            const params = new URLSearchParams(window.location.search);
            const accessToken = params.get("accessToken");
            const refreshToken = params.get("refreshToken");

            if (accessToken && refreshToken) {
                const tokens = { accessToken, refreshToken };

                localStorage.setItem(Constant.AuthTokenKey, JSON.stringify(tokens));
                setAuthTokens(tokens);

                // Clean up URL parameters (optional)
                window.history.replaceState(
                    {},
                    document.title,
                    window.location.pathname
                );
            }

            setIsProcessing(false);
        };

        processOAuth2Tokens();
    }, [setAuthTokens]);

    useEffect(() => {
        if (user && !isProcessing) {
            // console.log(user)
            const { isAdmin, isUser } = useRoleValidator(user);
            if (isAdmin) {
                if (isUser) {
                    router.push(Constant.Page.HomePage);
                }
                if (isAdmin) {
                    router.push(Constant.Page.AdminDashboardPage);
                }
            }
        }
    }, [user, isProcessing]);

    if (isProcessing) {
        return (
            <div>
                <Spinner_C size="h-8 w-8 border-2" color="green-600" />
            </div>
        );
    }
}
