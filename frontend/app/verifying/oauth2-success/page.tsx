'use client';
import Constant from '@/configs/Constant';
import React, { useEffect } from 'react'

export default function Page() {
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const accessToken = params.get("accessToken");
        const refreshToken = params.get("refreshToken");

        console.log("accessToken: ", accessToken);
        console.log("refreshToken: ", refreshToken);

        if (accessToken && refreshToken) {
            localStorage.setItem(Constant.AuthTokenKey, JSON.stringify({accessToken, refreshToken}))
        } 
        else {

        }
    }, []);
    return (
        <div>Oauth2 login successfully!</div>
    )
}
