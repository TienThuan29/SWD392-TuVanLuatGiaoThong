export type ChatHistory = {
    id?: string;
    user_id?: string;
    history?: Array<{ user?: string; bot?: string; date_time?: string }>;
    is_deleted?: boolean;
    created_date?: string;
};
