'use client'
import { Api } from '@/configs/Api';
import Constant from '@/configs/Constant';
import useAxios from '@/hooks/useAxios';
import { useRoleValidator } from '@/hooks/useRoleValidator';
import { User } from '@/models/User';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react'
import { toast } from 'sonner';

export default function Page() {
    const api = useAxios();
    const router = useRouter();
    const [user, setUser] = useState<User | null>(null);
    const { isUser, isAdmin, role } = useRoleValidator(user);

    useEffect(() => {
        const fetchData = async () => {
            console.log("verifying....");
            const response = await api.get(Api.Authenticaion.USER_INFO)
            if (response.status === 200) {
                setUser(response.data.dataResponse)
            }
            else {
                toast('Something went wrong!')
            }
        }
        fetchData().catch(console.error)
    }, [api]);

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
    }, [user, isUser, isAdmin, role]);
    
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>

        </div>
    )
}