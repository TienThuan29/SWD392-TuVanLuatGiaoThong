export type ChatItem = {
    userText?: string;
    botText?: string;
    createdDate?: Date;
}

export type ChatHistory = {
    id: string;
    sessionId: string;
    modelAlias: string;
    userId: string;
    createdDate: string;
    chatTitle: string;
    histories: ChatItem[];
}
