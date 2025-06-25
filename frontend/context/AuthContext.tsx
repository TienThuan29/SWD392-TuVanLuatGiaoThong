'use client';
import { createContext, useContext, useEffect, useState } from 'react';
import { AuthTokens, User } from '../models/User';
import axios from 'axios';
import { Api } from '@/configs/Api';
import { toast } from 'sonner';
import Constant from '@/configs/Constant';
import { permanentRedirect, useRouter } from 'next/navigation'
import HttpStatus from '@/configs/HttpStatus';

const AUTH_TOKENS_KEY = Constant.AuthTokenKey;

type UserContextType = {
    user: User | null,
    authTokens: AuthTokens | null,
    loginUser: (username: string, password: string) => void,
    logout: () => void,
    isLoggedIn: () => boolean,
    setUser: (user: User) => void,
    setAuthTokens: (authTokens: AuthTokens) => void
}

const UserContext = createContext<UserContextType>({} as UserContextType);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
    const router = useRouter();
    const [authTokens, setAuthTokens] = useState<AuthTokens | null>(null);
    const [user, setUser] = useState<User | null>(null);
    const [isReady, setIsReady] = useState<boolean>(false);
    
    const fetchUser = async (tokens: AuthTokens) => {
        try {
            const response = await axios.get(Api.BASE_API + Api.Authenticaion.USER_INFO, {
                headers: {
                    'Authorization': `Bearer ${tokens.accessToken}`
                }
            });
            
            if (response.status === HttpStatus.OK) {
                setUser(response.data.dataResponse);
            }
        } catch (error) {
            // console.log('Failed to fetch user:', error);
            if (axios.isAxiosError(error) && error.response?.status === HttpStatus.UNAUTHORIZED) {
                logout();
            }
        }
    };

    useEffect(() => {
        const initAuth = async () => {
            const authTokensString = localStorage.getItem(AUTH_TOKENS_KEY);
            const tokens = authTokensString ? JSON.parse(authTokensString) : null;
            
            if (tokens) { 
                setAuthTokens(tokens);
                await fetchUser(tokens);
            }
            
            setIsReady(true);
        };

        initAuth();
    }, []);

    const loginUser = async (username: string, password: string) => {
        const authenticationRequest = {
            username: username,
            password: password
        }
        try {
            const response = await axios.post(Api.BASE_API + Api.Authenticaion.LOGIN, authenticationRequest);
            if (response.status === HttpStatus.OK) {
                const tokens = response.data.dataResponse;
                setAuthTokens(tokens);
                localStorage.setItem(AUTH_TOKENS_KEY, JSON.stringify(tokens));

                await fetchUser(tokens);
                router.push(Constant.Page.VerifyPage);
            }
            else if (response.status === HttpStatus.UNAUTHORIZED) {
                toast.error(response.data.message);
            }
        }
        catch (error) {
            console.log(error);
            if (axios.isAxiosError(error) && error.response) {
                toast.error(error.response.data.message);
            } 
            else {
                toast.error('An unexpected error occurred');
            }
        }
    }

    const logout = () => {
        localStorage.removeItem(AUTH_TOKENS_KEY);
        setUser(null);
        setAuthTokens(null);
        permanentRedirect(Constant.Page.LoginPage);
    }

    const isLoggedIn = (): boolean => {
        return !!user;
    }

    return (
        <UserContext.Provider value={{
            loginUser, user, authTokens, logout, isLoggedIn, setUser, setAuthTokens
        }}>
            {isReady ? children : null}
        </UserContext.Provider>
    )
}

export const useAuth = () => useContext(UserContext);