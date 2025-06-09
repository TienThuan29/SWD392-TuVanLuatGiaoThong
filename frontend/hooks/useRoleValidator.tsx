import { useMemo } from 'react';
import { Role, User } from "@/models/User";
import { decodeHashedString } from "@/ownUtils/all/hashingUtil";

interface RoleValidator {
  isUser: boolean;
  isAdmin: boolean;
  role: string | null;
  hasRole: (targetRole: string) => boolean;
}

export function useRoleValidator(user: User | null | undefined): RoleValidator {
  return useMemo(() => {
    if (!user?.role) {
      return {
        isUser: false,
        isAdmin: false,
        role: null,
        hasRole: () => false,
      };
    }

    const decodedRole = decodeHashedString(user.role);
    
    return {
      isUser: decodedRole === Role.USER,
      isAdmin: decodedRole === Role.ADMIN,
      role: decodedRole,
      hasRole: (targetRole: string) => decodedRole === targetRole,
    };
  }, [user?.role]);
}