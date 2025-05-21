'use client'
import { Api } from '@/configs/Api';
import useAxios from '@/hooks/useAxios';
import { User } from '@/models/User';
// import { useRouter } from 'next/navigation';
import  { useEffect, useState } from 'react'
import { toast } from 'sonner';
import { isUser, isAdmin } from './RoleValidator';

export default function Page() {
    const api = useAxios();
    // const router = useRouter();
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            console.log("verifying....");
            const response = await api.get(Api.Authenticaion.USER_INFO)
            if (response.status === 200) {
                console.log(response.data.dataResponse);
                setUser(response.data.dataResponse)
            }
            else {
                toast('Something went wrong!')
            }
        }
        fetchData().catch(console.error)
    }, [api]);

    if (user && user.role) {
        if (isUser(user)) {
            console.log("User")
        }
        if (isAdmin(user)) {
            console.log("Admin")
        }
    }
    
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            {/* <LoadingEffect_DaisyUI /> */}
        </div>
    )
}
