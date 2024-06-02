'use client';

import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
import ProfileDetails from './ProfileDeails';

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

async function getUserData() {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/user/`, {
            cache: "no-store"
        });
        if (res.ok) {
            return res.json();
        }
    } catch (error) {
        console.error("Error fetching user data:", error);
    }
}

const UserProfile: React.FC = () => {
    const { data: session } = useSession();
    const [profile, setProfile] = useState<User | null>(null);

    useEffect(() => {
        const fetchUserData = async () => {
            if (session?.user?.email) {
                const data = await getUserData();
                if (data) {
                    const userData = data.find((user: User) => user.email === session?.user?.email);
                    if (userData) {
                        setProfile(userData);
                    }
                }
            }
        };

        fetchUserData();
    }, [session]);

    return (
        <div>
            {profile && (
                <ProfileDetails profile={profile} />
            )}
        </div>
    );
};

export default UserProfile;
