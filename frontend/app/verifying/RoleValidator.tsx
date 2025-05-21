import { Role, User } from "@/models/User";
import { decodeHashedString } from "@/ownUtils/all/hashingUtil";

export function isUser(user: User) : boolean {
    if (!user.role) return false;
    const role = decodeHashedString(user.role);
    return role === Role.USER;
}

export function isAdmin(user: User) : boolean {
    if (!user.role) return false;
    const role = decodeHashedString(user.role);
    return role === Role.ADMIN;
}