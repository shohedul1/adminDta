'use client';

import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
import ProfileDeails from './ProfileDeails';

type User = {
    _id: string;
    name: string;
    email: string;
    password: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
    avatar: { url: string };
    age?: string;
    designation?: string;
    location?: string;
    about?: string;
};

const UserProfile: React.FC = () => {
    const [profile, setProfile] = useState<User[]>([]);
    const { data: session } = useSession();

    const userGet = async () => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/user`, {
                cache: 'no-store'
            });
            if (res.ok) {
                const resData: User[] = await res.json();
                setProfile(resData);
            } else {
                console.error('Failed to fetch user profile');
            }
        } catch (error) {
            console.error('An error occurred while fetching user profile:', error);
        }
    };


    useEffect(() => {
        userGet();
    }, []);

    return (
        <div>
            {session && (
                <ProfileDeails profile={profile} />
            )}
        </div>
    );
};

export default UserProfile;
