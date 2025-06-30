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
    // console.log("useRoleValidator - user:", user);
    // console.log("useRoleValidator - user.role:", user?.role);
    
    if (!user?.role) {
      // console.log("useRoleValidator - no role found");
      return {
        isUser: false,
        isAdmin: false,
        role: null,
        hasRole: () => false,
      };
    }

    let decodedRole: string;
    try {
      decodedRole = decodeHashedString(user.role);
      // console.log("useRoleValidator - decoded role:", decodedRole);
    } catch (error) {
      // console.log("useRoleValidator - failed to decode role, using raw role:", user.role);
      decodedRole = user.role;
    }
    
    const result = {
      isUser: decodedRole === Role.USER || decodedRole === "ROLE_USER",
      isAdmin: decodedRole === Role.ADMIN || decodedRole === "ROLE_ADMIN",
      role: decodedRole,
      hasRole: (targetRole: string) => decodedRole === targetRole,
    };
    
    // console.log("useRoleValidator - result:", result);
    return result;
  }, [user?.role]);
}