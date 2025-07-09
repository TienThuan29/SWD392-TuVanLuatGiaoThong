import Env from "./Env";

export const Api = {
    BASE_API: Env.backendApiGateWayUrl? Env.backendApiGateWayUrl : "http://localhost:8222",

    Authenticaion: {
        LOGIN: '/api/v1/identity/authenticate',
        REGISTER: '/api/v1/identity/register-with-verifying',
        VERIFY_OTP: '/api/v1/identity/verify-otp',
        REFRESH: '/api/v1/identity/refresh',
        USER_INFO: '/api/v1/identity/user'
    },

    User: {
        GET_ALL: '/api/v1/admin/user-management/users',
        DISABLE_USER: '/api/v1/admin/user-management/disable/'
    },

    Law: {
        GET_ALL: '/api/v1/law/get-all',
        GET_BY_ID: '/api/v1/law/get/',
        CREATE: '/api/v1/law/admin/create',   
        UPDATE: '/api/v1/law/admin/update/',
        DEACTIVATE: '/api/v1/law/admin/deactivte/'
    },

    LawType: {
        GET_ALL: '/api/v1/law/type/get-all',
        GET_BY_ID: '/api/v1/law/type/get/',
        UPDATE: '/api/v1/law/admin/type/update/',
        CREATE: '/api/v1/law/admin/type/create'
    },

    Chatbot: {
        ASK_TO_GENERATE: '/api/v1/chatbotNen/generate',
        ASK_T0_GENERATE_WITH_AUTH_USER: '/api/v1/chatbotNen/authenticated-user/generate',
        GET_ALL_CHAT_HISTORIES_OF_USER: '/api/v1/chatbotNen/authenticated-user/get-histories/',
        RENAME_CHAT_TITLE: '/api/v1/chatbotNen/rename-title',
        DELETE_HISTORY: '/api/v1/chatbotNen/delete-history/'
    },

    File: {
        UPLOAD: '/api/v1/aws/s3/upload',
        CREATE_FOLDER: '/api/v1/aws/s3/create-folder',
    },

    UsagePackage: {
        CREATE: '/api/v1/user-packages/usage-package/admin/create',
        UPDATE: '/api/v1/user-packages/usage-package/admin/update/',
        DEACTIVATE: '/api/v1/user-packages/usage-package/admin/deactivate/',
        GET_ALL: '/api/v1/user-packages/usage-package/get-all',
        GET_BY_ID: '/api/v1/user-packages/usage-package/get/',
        GET_CURRENT_USAGE_PACKAGE_OF_USER: '/api/v1/user-packages/usage-package/get/current-usage-package/'
    },

    Payment: {
        BUY_PACKAGE_WITH_MOMO: '/api/v1/user-packages/payment/momo',
        COMPLETE_PAYMENT_COMFIRMATION: '/api/v1/user-packages/payment/ipn'
    }
    
}