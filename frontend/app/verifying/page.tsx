'use client'
import { Api } from '@/configs/Api';
import Constant from '@/configs/Constant';
import { useAuth } from '@/context/AuthContext';
import useAxios from '@/hooks/useAxios';
import { useRoleValidator } from '@/hooks/useRoleValidator';
import { User } from '@/models/User';
import { useRouter } from 'next/navigation';
import { useEffect, useState, useRef } from 'react'
import { toast } from 'sonner';

export default function Page() {
    const api = useAxios();
    const { user, setUser } = useAuth();
    const router = useRouter();
    const { isUser, isAdmin, role } = useRoleValidator(user);
    const [loading, setLoading] = useState(true);
    const [timeoutError, setTimeoutError] = useState(false);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        // Set a timeout for verification
        timeoutRef.current = setTimeout(() => {
            setLoading(false);
            setTimeoutError(true);
        }, 10000); // 10 seconds

        const fetchData = async () => {
            console.log("verifying....");
            const response = await api.get(Api.Authenticaion.USER_INFO)
            if (response.status === 200) {
                setUser(response.data.dataResponse)
            }
            else {
                toast('Something went wrong!')
            }
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
            setLoading(false);
        }
        fetchData().catch((err) => {
            console.error(err);
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
            setLoading(false);
        })
        // Cleanup timeout on unmount
        return () => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        }
    }, [api, setUser]);

    useEffect(() => {
        if (user && user.role) {
            if (isUser) {
                router.push(Constant.Page.HomePage)
            }
            if (isAdmin) {
                router.push(Constant.Page.AdminDashboardPage)
            }
            console.log("Current role:", role);
        }
    }, [user, isUser, isAdmin, role, router]);
    
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            {loading && !timeoutError && (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <div style={{
                        border: '6px solid #f3f3f3',
                        borderTop: '6px solid #3498db',
                        borderRadius: '50%',
                        width: 50,
                        height: 50,
                        animation: 'spin 1s linear infinite'
                    }} />
                    <style>{`
                        @keyframes spin {
                            0% { transform: rotate(0deg); }
                            100% { transform: rotate(360deg); }
                        }
                    `}</style>
                    <span style={{ marginTop: 16 }}>Đang đăng nhập...</span>
                </div>
            )}
            {timeoutError && (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <span style={{ color: 'red', marginBottom: 16 }}>Có lỗi xảy ra khi đăng nhập! Vui lòng thử lại</span>
                    <button
                        style={{
                            padding: '8px 16px',
                            background: '#3498db',
                            color: 'white',
                            border: 'none',
                            borderRadius: 4,
                            cursor: 'pointer',
                            fontSize: 16
                        }}
                        onClick={() => router.push(Constant.Page.HomePage)}
                    >
                        Trở về trang chủ
                    </button>
                </div>
            )}
        </div>
    )
}