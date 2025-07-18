import axios from 'axios'
import { jwtDecode } from 'jwt-decode'
import dayjs from 'dayjs';
import { Api } from '@/configs/Api';
import Constant from '@/configs/Constant';
import { useMemo, useCallback } from "react";
import { AuthTokens, User } from '@/models/User';
import { useAuth } from '@/context/AuthContext';

const useAxios = () => {
    const { authTokens, setUser, setAuthTokens } = useAuth();

    // Memoize setUser and setAuthTokens to prevent unnecessary re-renders
    const memoizedSetUser = useCallback((user: User) => setUser(user), [setUser]);
    const memoizedSetAuthTokens = useCallback((tokens: AuthTokens) => setAuthTokens(tokens), [setAuthTokens]);

    const AxiosInstance = useMemo(() => {
        const instance = axios.create({
            baseURL: Api.BASE_API,
            headers: {
                Authorization: `Bearer ${authTokens?.accessToken}`
            }
        });

        instance.interceptors.request.use(async req => {
            const user = jwtDecode(authTokens?.accessToken || '{}');
            const isExpired = user.exp ? dayjs.unix(user.exp).diff(dayjs()) < 1 : true;
            if (!isExpired) return req;

            const response = await axios.post(Api.BASE_API + Api.Authenticaion.REFRESH, {}, {
                headers: {
                    Authorization: `Bearer ${authTokens?.refreshToken}`,
                }
            });

            memoizedSetAuthTokens(response.data);
            memoizedSetUser(jwtDecode(response.data.access_token));
            localStorage.setItem(Constant.AuthTokenKey, JSON.stringify(response.data));

            req.headers.Authorization = `Bearer ${response.data.access_token}`;
            return req;
        });

        // Add response interceptor to handle JWT invalid/expired
        instance.interceptors.response.use(
            response => response,
            error => {
                if (error.response && (error.response.status === 401 || error.response.status === 403)) {
                    // Clear tokens and user
                    memoizedSetAuthTokens(null as any);
                    memoizedSetUser(null as any);
                    localStorage.removeItem(Constant.AuthTokenKey);
                    // Redirect to login page
                    window.location.replace(Constant.Page.LoginPage);
                }
                return Promise.reject(error);
            }
        );

        return instance;
    }, [authTokens, memoizedSetAuthTokens, memoizedSetUser]);

    return AxiosInstance;
}

export default useAxios;
