import Env from "./Env";

export const Api = {
    BASE_API: Env.backendApiGateWayUrl,

    Authenticaion: {
        LOGIN: '/api/v1/identity/authenticate',
        REGISTER: '/api/v1/identity/register',
        REFRESH: '/api/v1/identity/refresh',
        USER_INFO: '/api/v1/identity/user'
    },

    User: {
        
    },

    
}