export const Role = {
    ADMIN : 'ADMIN',
    USER: 'USER'
}

export type User = {
    id?: string;
    username?: string;
    email?: string;
    fullname?: string;
    avatarUrl?: string;
    birthDay?: string;
    isEnable: boolean;
    createdDate?: string;
    updatedDate?: string;
    role?: string;
}

export type AuthTokens = {
    accessToken: string;
    refreshToken: string;
}