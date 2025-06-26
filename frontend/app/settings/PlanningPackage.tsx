'use client';

import { User } from '@/models/User';
import React, { useState } from 'react';

type Props = {
    logedUser: User;
}

export default function PlanningPackage({ logedUser }: Props) {

    const [user, setUser] = useState<User>(logedUser);

    return (
        <div className="max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold mb-6">Gói thành viên</h1>
            
        </div>
    );
}
